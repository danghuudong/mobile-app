import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  HeartPulse,
  Leaf,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { Brand } from "../../shared/Brand";
import "./login.css";

type FieldErrors = { email?: string; password?: string };

export function LoginPage() {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Sign in | Lemoncare";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  function clearFeedback(field: keyof FieldErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current;
    const password = passwordRef.current;
    if (!email || !password) return;

    const nextErrors: FieldErrors = {};
    if (email.validity.valueMissing) {
      nextErrors.email = "Enter your email address.";
    } else if (!email.validity.valid) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (password.validity.valueMissing) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    setNotice("");
    if (nextErrors.email) {
      email.focus();
      return;
    }
    if (nextErrors.password) {
      password.focus();
      return;
    }

    // UI preview only: never send or store credentials or create a fake session.
    setNotice("Sign-in is not enabled in this preview.");
  }

  return (
    <div className="login-page">
      <a className="login-skip-link" href="#login-form">
        Skip to sign in
      </a>
      <header className="login-header">
        <a className="login-brand-link" href="/" aria-label="Lemoncare home">
          <Brand />
        </a>
        <a className="login-back-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to overview
        </a>
      </header>

      <main className="login-layout">
        <aside className="login-story" aria-labelledby={`${id}-story-heading`}>
          <span className="login-eyebrow">
            <Leaf size={15} aria-hidden="true" /> YOUR HEALTH, A LITTLE BRIGHTER
          </span>
          <h2 id={`${id}-story-heading`}>
            A little care.
            <br />A brighter <em>everyday.</em>
          </h2>
          <p>
            Make a little space for yourself. Your health journey starts with
            people who care.
          </p>
          <div className="login-photo-frame">
            <img
              className="login-photo"
              src="/images/dr-sarah.jpg"
              alt="A smiling doctor welcoming you to Lemoncare"
              width="480"
              height="440"
            />
            <div className="login-care-note">
              <span className="login-care-icon">
                <HeartPulse size={23} aria-hidden="true" />
              </span>
              <div>
                <strong>Good care starts with you.</strong>
                <span>One small step toward feeling better.</span>
              </div>
            </div>
          </div>
          <span className="login-story-footnote">
            Thoughtful care. A familiar face. A little peace of mind.
          </span>
        </aside>

        <section className="login-form-panel" aria-labelledby={`${id}-heading`}>
          <div className="login-form-intro">
            <span className="login-welcome-icon" aria-hidden="true">
              <HeartPulse size={27} strokeWidth={1.6} />
            </span>
            <span className="login-eyebrow">YOUR HEALTH SPACE</span>
            <h1 id={`${id}-heading`}>Welcome back.</h1>
            <p>A little care is just a sign-in away.</p>
          </div>

          <form
            id="login-form"
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="login-field">
              <label htmlFor={`${id}-email`}>Email address</label>
              <div className="login-input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input
                  ref={emailRef}
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="you@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? `${id}-email-error` : undefined
                  }
                  onChange={() => clearFeedback("email")}
                />
              </div>
              {errors.email && (
                <p
                  id={`${id}-email-error`}
                  className="login-field-error"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor={`${id}-password`}>Password</label>
              <div className="login-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  ref={passwordRef}
                  id={`${id}-password`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? `${id}-password-error` : undefined
                  }
                  onChange={() => clearFeedback("password")}
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-controls={`${id}-password`}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id={`${id}-password-error`}
                  className="login-field-error"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button className="login-submit" type="submit">
              Sign in <ArrowRight size={19} aria-hidden="true" />
            </button>
            <div
              className="login-notice"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {notice && <p>{notice}</p>}
            </div>
          </form>
          <p className="login-account-help">
            Use the email address linked to your Lemoncare account.
          </p>
          <div className="login-form-footer">
            <Leaf size={15} aria-hidden="true" /> A healthier you, together.
          </div>
        </section>
      </main>
      <footer className="login-footer">
        © {new Date().getFullYear()} Lemoncare. Made with care.
      </footer>
    </div>
  );
}
