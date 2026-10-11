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

  // While open: lock page scroll, trap focus inside the panel, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a[href], button")].filter(Boolean) as HTMLElement[];
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
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // No backdrop-filter while the menu is open: it would make the fixed panel position against the header.
  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open ? "bg-ivory" : scrolled ? "bg-ivory/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-ivory/0"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="relative z-10 -m-2 p-2" aria-label={`${site.name}, home`}>
          <Logo className="h-7 w-auto md:h-8" priority />
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
            className="group hidden min-h-11 items-center gap-3 bg-ink px-4 text-[0.9rem] font-medium text-ivory transition-colors hover:bg-ink-2 sm:inline-flex"
          >
            Start a Project
            <span aria-hidden="true" className="size-1.5 rounded-full bg-lime transition-transform duration-300 group-hover:scale-150" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpenedAt(pathname))}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ivory md:top-20 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between pt-8 pb-10">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                  className="flex items-baseline justify-between py-5 text-display-3 aria-[current=page]:italic"
                >
                  {item.label}
                  <span className="text-label text-graphite">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6">
            <Link href="/contact" className="flex min-h-12 items-center justify-between bg-ink px-5 text-ivory">
              Start a Project <ArrowRight />
            </Link>
            <a href={`mailto:${site.contact.email}`} className="text-graphite">
              {site.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
