import Link from "next/link";
import { site } from "@/config/site";
import { SocialIcon, type SocialName } from "./SocialIcon";

/** Minimal footer: the social handle and icons, copyright, and the two legal pages. Nothing else. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-line-dark bg-ink text-ivory">
      <div className="container-x pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-label text-mist">Follow the studio</p>
            <p className="text-display-2 mt-4 italic">{site.handle}</p>
          </div>
          <ul className="flex gap-2 md:col-span-4 md:justify-end" aria-label="Social media">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="grid size-12 place-items-center border border-ivory/30 transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink md:size-14"
                >
                  <SocialIcon name={s.label as SocialName} className="size-[1.15rem]" />
                  <span className="sr-only">
                    {s.label}, {s.handle} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line-dark pt-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link className="link-draw hover:text-ivory" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="link-draw hover:text-ivory" href="/terms">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
