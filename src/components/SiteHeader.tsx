"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/config/site";
import { Logo } from "./Logo";
import { ArrowRight } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpenedAt(null);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock page scroll (html and body, which iOS needs), trap focus inside the panel, close on Escape or
  // when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const root = document.documentElement;
    const prev = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = [...panel.querySelectorAll<HTMLElement>("a[href], button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && close(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      [root.style.overflow, document.body.style.overflow] = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`on-dark sticky top-0 z-50 bg-ink text-ivory transition-shadow duration-300 ${
        scrolled && !open ? "shadow-[0_1px_0_var(--color-line-dark)]" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="relative z-10 -m-2 p-2" aria-label={`${site.name}, home`}>
          <Logo tone="light" className="h-7 w-auto md:h-8" priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`link-draw py-1 text-[0.95rem] ${isActive(item.href) ? "bg-[length:100%_1px]" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="group hidden min-h-11 items-center gap-3 border border-ivory bg-ivory px-4 text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory sm:inline-flex"
          >
            Start a Project
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current transition-transform duration-300 group-hover:scale-150" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenedAt(pathname)}
          >
            <span className="sr-only">Open menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
              <path d="M2 8h20M2 16h20" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen menu with its own bar and Close button, so closing never depends on the page header (WebKit can
          hide a sticky header's controls behind a fixed panel). */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-ink pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-ivory lg:hidden"
      >
        <div className="container-x flex h-16 shrink-0 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="-m-2 p-2" aria-label={`${site.name}, home`} onClick={() => close(false)}>
            <Logo tone="light" className="h-7 w-auto md:h-8" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={() => close()}
            className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.9rem]"
          >
            Close
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-between pt-6 pb-10" onClick={(e) => (e.target as HTMLElement).closest("a") && close(false)}>
          <ul className="border-t border-line-dark">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
              <li key={item.href} className="border-b border-line-dark">
                <Link
                  href={item.href}
                  aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                  className="flex items-baseline justify-between py-5 text-display-3 aria-[current=page]:italic"
                >
                  {item.label}
                  <span className="text-label text-mist">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6">
            <Link href="/contact" className="flex min-h-12 items-center justify-between border border-ivory bg-ivory px-5 text-ink">
              Start a Project <ArrowRight />
            </Link>
            <a href={`mailto:${site.contact.email}`} className="text-mist">
              {site.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
