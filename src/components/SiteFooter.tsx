import Link from "next/link";
import { mainNav, site } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";
import { SmartLink } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const col = "grid content-start gap-3";
  const head = "text-label mb-2 text-mist";
  const link = "link-draw w-fit text-ivory/85 hover:text-ivory";

  return (
    <footer className="on-dark border-t border-line-dark bg-ink text-ivory">
      <div className="container-x grid gap-10 pt-14 pb-10 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="h-9 w-auto" />
            <p className="mt-6 max-w-sm text-mist">
              A creative and technology company from {site.base}. We design and build brands, digital products and experiences.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <div className={col}>
              <p className={head}>Company</p>
              <Link className={link} href="/">Home</Link>
              {mainNav.map((n) => (
                <Link key={n.href} className={link} href={n.href}>
                  {n.label}
                </Link>
              ))}
              <Link className={link} href="/contact">Start a Project</Link>
            </div>
            <div className={col}>
              <p className={head}>Services</p>
              {services.map((s) => (
                <Link key={s.slug} className={link} href={`/services/${s.slug}`}>
                  {s.shortTitle}
                </Link>
              ))}
            </div>
            <div className={col}>
              <p className={head}>Contact</p>
              <a className={`${link} break-all`} href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              <a className={link} href={`tel:${site.contact.phoneIntl}`}>
                {site.contact.phoneDisplay}
              </a>
              <SmartLink className={link} href={site.contact.whatsapp}>
                WhatsApp
              </SmartLink>
            </div>
            <div className={col}>
              <p className={head}>Follow</p>
              {site.social.map((s) => (
                <SmartLink key={s.url} className={link} href={s.url}>
                  {s.label}
                </SmartLink>
              ))}
              <p className={`${head} mt-6`}>Our product</p>
              <SmartLink className={link} href={site.baidx.url}>
                BAID X
              </SmartLink>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line-dark pt-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link className="link-draw" href="/privacy">Privacy</Link>
            <Link className="link-draw" href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
