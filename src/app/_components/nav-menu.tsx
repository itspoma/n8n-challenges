"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavMenuItem = {
  href: string;
  label: string;
  active?: boolean;
  badge?: string;
};

type NavMenuProps = {
  className: string;
  label: string;
  items: NavMenuItem[];
  icon: "chevron" | "bars";
  active?: boolean;
};

// Disclosure menu for header links: "More" on desktop and "Menu" once the
// desktop nav is hidden. It closes on outside clicks, Escape, focus moving
// elsewhere, or choosing a link.
export function NavMenu({ className, label, items, icon, active = false }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function isOutside(target: EventTarget | null) {
      return !(target instanceof Node && containerRef.current?.contains(target));
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    }

    // focusin only fires when something receives focus, so clicking a menu link
    // in browsers that do not focus links on click cannot close the menu early.
    function closeOnOutsideFocus(event: FocusEvent) {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("focusin", closeOnOutsideFocus);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("focusin", closeOnOutsideFocus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={`nav-menu ${className}`} ref={containerRef}>
      <button
        ref={buttonRef}
        className={active ? "nav-menu-button active" : "nav-menu-button"}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {icon === "bars" ? (
          <svg className="nav-menu-icon" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 3.5h10M2 7h10M2 10.5h10" />
          </svg>
        ) : null}
        {label}
        {icon === "chevron" ? (
          <svg className="nav-menu-chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path d="m3 4.5 3 3 3-3" />
          </svg>
        ) : null}
      </button>
      <ul className="nav-menu-list" id={menuId} hidden={!open}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className={item.active ? "active" : undefined}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.badge ? <span className="nav-count">{item.badge}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
