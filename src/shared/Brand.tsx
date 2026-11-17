import { Plus } from "lucide-react";

export function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">
        <Plus size={22} strokeWidth={3} />
      </span>
      lemoncare<span className="brand-dot">.</span>
    </div>
  );
}
