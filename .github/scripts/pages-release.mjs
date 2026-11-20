import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const manifestName = "release.json";
const staticPaths = [
  "index.html",
  "login/index.html",
  "favicon.svg",
  "images/dr-emily.jpg",
  "images/dr-james.jpg",
  "images/dr-sarah.jpg",
];
const assetPath = /^assets\/[\w.-]+\.(?:js|css)$/;
const commitSha = /^[a-f0-9]{40}$/;
const fileSha = /^[a-f0-9]{64}$/;

function digest(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

async function writeManifest(directory, commit) {
  const assets = (await readdir(join(directory, "assets")))
    .map((name) => `assets/${name}`)
    .filter((path) => assetPath.test(path))
    .sort();
  if (!commitSha.test(commit) || !assets.some((path) => path.endsWith(".js"))) {
    throw new Error(
      "A release needs a commit SHA and built JavaScript assets.",
    );
  }

  const files = await Promise.all(
    [...staticPaths, ...assets].map(async (path) => {
      const contents = await readFile(join(directory, path));
      if (!contents.length) throw new Error(`Build file is empty: ${path}`);
      return [path, digest(contents)];
    }),
  );
  const manifest = { commit, files: Object.fromEntries(files) };
  await writeFile(
    join(directory, manifestName),
    `${JSON.stringify(manifest)}\n`,
  );
}

async function download(base, path, cacheKey, signal) {
  const url = new URL(path, base);
  url.searchParams.set("release-check", cacheKey);
  const response = await fetch(url, { redirect: "error", signal });
  if (!response.ok)
    throw new Error(`${url.pathname} returned HTTP ${response.status}`);
  return response;
}

async function verifyRelease(base, expectedManifest) {
  const cacheKey = Date.now().toString();
  const signal = AbortSignal.timeout(15_000);
  const response = await download(base, manifestName, cacheKey, signal);
  const published = Buffer.from(await response.arrayBuffer());
  if (expectedManifest && !published.equals(expectedManifest)) {
    throw new Error("The site has not published the staged release manifest.");
  }

  const { commit, files } = JSON.parse(published.toString("utf8"));
  const entries = Object.entries(files ?? {});
  if (
    !commitSha.test(commit) ||
    !staticPaths.every((path) => Object.hasOwn(files ?? {}, path)) ||
    !entries.some(([path]) => assetPath.test(path) && path.endsWith(".js")) ||
    !entries.every(
      ([path, sha]) =>
        (staticPaths.includes(path) || assetPath.test(path)) &&
        fileSha.test(sha),
    )
  ) {
    throw new Error("The published release manifest is invalid.");
  }

  await Promise.all(
    entries.map(async ([path, sha]) => {
      const route = path.endsWith("index.html")
        ? path.slice(0, -"index.html".length)
        : path;
      const file = await download(base, route, cacheKey, signal);
      const contentType = file.headers.get("content-type") ?? "";
      if (
        (path.endsWith(".html") && !contentType.startsWith("text/html")) ||
        (path.endsWith(".css") && !contentType.startsWith("text/css")) ||
        (path.endsWith(".js") &&
          !/\b(?:javascript|ecmascript)\b/.test(contentType))
      ) {
        throw new Error(
          `${path} returned unexpected Content-Type ${contentType}`,
        );
      }
      if (digest(Buffer.from(await file.arrayBuffer())) !== sha) {
        throw new Error(`${path} does not match the published release`);
      }
    }),
  );
  console.log(`Verified release ${commit} at ${base.href}`);
}

async function check(siteUrl, manifestPath) {
  const base = new URL(siteUrl);
  if (
    base.protocol !== "https:" ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  ) {
    throw new Error("The release URL must be an HTTPS site URL.");
  }
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  const expected = manifestPath ? await readFile(manifestPath) : undefined;

  for (let attempt = 1; ; attempt++) {
    try {
      await verifyRelease(base, expected);
      return;
    } catch (error) {
      if (attempt === 8) throw error;
      console.log(`Verification attempt ${attempt} failed: ${error.message}`);
      await delay(10_000);
    }
  }
}

const [, , command, target, manifestOrCommit] = process.argv;
if (command === "manifest") await writeManifest(target, manifestOrCommit);
else if (command === "check") await check(target, manifestOrCommit);
else
  throw new Error(
    "Use manifest <directory> <commit> or check <url> [manifest].",
  );
