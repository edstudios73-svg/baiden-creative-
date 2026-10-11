#!/usr/bin/env python3
"""Generates the static pages for baidencreatives.org (served at www.baidencreatives.org).

Run from the repo root:  python3 tools/build.py
It writes index.html, about.html, work.html, pricing.html, start-a-project.html,
404.html, sitemap.xml and robots.txt. The site itself needs no build step on Vercel;
commit the generated files.
"""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://www.baidencreatives.org"
TODAY = "2026-10-11"
V = "30"  # asset version, bump to bust caches

NAME = "Baiden Creatives"
EMAIL = "edstudios77@gmail.com"
PHONE_DISPLAY = "0558 362 423"
PHONE_INTL = "+233558362423"
WA = "https://wa.me/233558362423"
MAPS = "https://www.google.com/maps/search/?api=1&query=East+Legon+Accra+Ghana"

SOCIAL = [
    ("Instagram", "https://www.instagram.com/baidencreatives",
     '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
    ("TikTok", "https://www.tiktok.com/@baidencreatives",
     '<path d="M15 4v10.2a4.2 4.2 0 1 1-3.1-4.05"/><path d="M15 4c.7 2.1 2 3.3 4 3.8"/>'),
    ("Facebook", "https://www.facebook.com/baidencreatives",
     '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    ("X", "https://x.com/baidencreatives",
     '<path d="M4 4l16 16M20 4L4 20"/>'),
    ("YouTube", "https://www.youtube.com/@baidencreatives",
     '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>'),
    ("WhatsApp", WA,
     '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.3-1.6-2-1-.9.7a3.5 3.5 0 0 1-1.6-1.6l.7-.9-1-2z"/>'),
]

NAV = [("Home", "/"), ("About", "/about"), ("Work", "/work"), ("Pricing", "/pricing")]

PROJECTS = [
    ("skin", "Solenne Skin", "Skincare brand website", "https://skin-care-website-one.vercel.app", "Quietly effective skincare"),
    ("baidx", "BAID X", "Workforce platform website", "https://baid-x.vercel.app", "Connecting skills. Powering work."),
    ("jcutzz", "JCUTZZ", "Barber website, Birmingham", "https://jcutzz.vercel.app", "Sharp cuts, sharper standards."),
    ("nobles", "TheNobles Gift & Surprise Hub", "Gift shop website, Accra", "https://nobles-gift-hub-accra.vercel.app", "Say it with a gift."),
    ("mane", "Mane Naturals", "Natural hair care brand website", "https://mane-naturals.vercel.app", "Natural hair care from Ghana."),
    ("csc", "Christian Service Church", "Church website, East Legon", "https://www.christianservicechurch.org", "Christian Service Church. House of Testimonies."),
    ("wedding", "Xorlali & Daniella", "Wedding website", "https://xorlali-daniella-wedding-site.vercel.app", "Xorlali & Daniella. 18.07.2027"),
    ("ompad", "Ompad Media", "Media website", "https://ompadmedia.netlify.app", "Ompad Media"),
]
FEATURED = ["baidx", "csc", "skin"]

SERVICES = [
    ("Web Development", "Business websites, online stores and custom web apps that load fast and are easy to manage.",
     ["Business & corporate sites", "E-commerce", "Booking websites"]),
    ("Web Design", "Layouts that work on every screen and make it easy for customers to contact or buy from you.",
     ["UI / UX design", "Landing pages", "Website redesign"]),
    ("Graphic Design", "Flyers, posters, social media graphics and brand materials with one consistent look.",
     ["Flyers & posters", "Social media graphics", "Business cards"]),
]

PLANS = [
    ("Starter", "Individuals & small businesses", "", "2,500", 2500, False,
     ["1–3 page custom website", "Responsive on all devices", "Contact form & WhatsApp", "Domain, hosting & SSL", "Live in 5–7 days"]),
    ("Business", "Growing businesses", "", "5,000", 5000, True,
     ["Everything in Starter", "Up to 7 pages, custom UI/UX", "Gallery, portfolio & blog", "Analytics & Search Console", "30 days support"]),
    ("Professional", "Established brands & organisations", "", "8,500", 8500, False,
     ["Everything in Business", "Up to 12 pages, premium UI/UX", "CMS & advanced animations", "Booking/request system", "60 days support & training"]),
    ("E-Commerce", "Online sellers", "From ", "10,000", 10000, False,
     ["Catalogue, cart & checkout", "Mobile Money & card payments", "Customer accounts", "Admin dashboard & inventory", "3–6 weeks"]),
    ("Custom Web App", "Complex systems", "From ", "15,000", 15000, False,
     ["Logins, roles & dashboards", "Databases & APIs", "Payments & notifications", "Portals & booking systems", "Quoted after assessment"]),
]

FAQS = [
    ("How does payment work?", "Projects under GH₵10,000 are paid 60% upfront and 40% before launch. Larger projects are paid 50% upfront, 30% during development and 20% before final deployment."),
    ("What is not included in the package price?", "Domain and hosting renewals, premium plugins, paid APIs, stock images, professional photography, copywriting, large-scale data entry, third-party subscriptions, payment gateway charges, and major changes outside the agreed scope."),
    ("What happens when my website launches?", "We handle the full launch: domain and hosting setup, SSL/HTTPS, mobile and tablet optimisation, final testing and deployment. Business and Professional packages also include Google Analytics, Google Search Console, an XML sitemap and search indexing setup."),
    ("What do I need to provide to get started?", "Your logo, images, business information, contact details, social media links and any content you already have. If you do not have these yet, we will guide you through it."),
    ("Where is Baiden Creatives based, and do you work with clients outside Accra?", "Baiden Creatives is based in East Legon, Accra, Ghana. We work with businesses, organisations and individuals across Ghana, and projects can be delivered fully remotely."),
]

SECTORS = ["Small businesses", "Startups", "Event centres", "Churches", "Schools", "NGOs", "Restaurants",
           "Salons & beauty", "Fashion", "Real estate", "Creators", "Consultants"]


def e(s):
    return escape(s, quote=True)


def icon(path, cls="ic"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{path}</svg>'


def social_links():
    return '<div class="social">' + "".join(
        f'<a href="{u}" target="_blank" rel="noopener me" aria-label="{n}" title="{n}">{icon(p)}</a>' for n, u, p in SOCIAL
    ) + "</div>"


# ---------- structured data ----------
def org_node():
    offers = []
    for n, best, pre, price, num, feat, items in PLANS:
        offers.append({
            "@type": "Offer", "priceCurrency": "GHS",
            "price": num if not pre else None,
            "priceSpecification": {"@type": "PriceSpecification", "priceCurrency": "GHS",
                                   **({"minPrice": num} if pre else {"price": num})},
            "itemOffered": {"@type": "Service", "name": n + (" website" if n in ("Starter", "Business", "Professional") else ""),
                            "description": best + ": " + ", ".join(items[:3]),
                            "provider": {"@id": DOMAIN + "/#organization"},
                            "areaServed": [{"@type": "City", "name": "Accra"}, {"@type": "Country", "name": "Ghana"}]},
        })
        if offers[-1]["price"] is None:
            del offers[-1]["price"]
    place_addr = {"@type": "PostalAddress", "addressLocality": "East Legon, Accra",
                  "addressRegion": "Greater Accra Region", "addressCountry": "GH"}
    return {
        "@type": ["Organization", "ProfessionalService"], "@id": DOMAIN + "/#organization",
        "name": NAME, "alternateName": "Baiden Creative", "url": DOMAIN + "/",
        "logo": {"@type": "ImageObject", "@id": DOMAIN + "/#logo", "url": DOMAIN + "/assets/baiden-creatives-logo-square.png",
                 "contentUrl": DOMAIN + "/assets/baiden-creatives-logo-square.png", "width": 512, "height": 512,
                 "caption": "Baiden Creatives logo"},
        "image": [{"@id": DOMAIN + "/#logo-wordmark"}, DOMAIN + "/assets/og.png"],
        "brand": {"@type": "Brand", "name": NAME, "logo": {"@id": DOMAIN + "/#logo"}},
        "description": "Baiden Creatives is a digital creative studio based in East Legon, Accra, Ghana, offering web development, web design and graphic design for businesses, organisations and entrepreneurs.",
        "slogan": "Your business. Digitally elevated.",
        "email": EMAIL, "telephone": PHONE_INTL, "address": place_addr,
        "areaServed": [{"@type": "City", "name": "Accra"}, {"@type": "AdministrativeArea", "name": "Greater Accra Region"}, {"@type": "Country", "name": "Ghana"}],
        "location": {"@type": "Place", "name": "Baiden Creatives, East Legon", "address": place_addr, "hasMap": MAPS},
        "knowsLanguage": "en", "priceRange": "GH₵100 – GH₵15,000+", "currenciesAccepted": "GHS",
        "paymentAccepted": "Mobile Money, Bank transfer, Cash",
        "founder": [{"@id": DOMAIN + "/#david"}, {"@id": DOMAIN + "/#daniel"}],
        "contactPoint": [{"@type": "ContactPoint", "telephone": PHONE_INTL, "email": EMAIL, "contactType": "customer service",
                          "areaServed": "GH", "availableLanguage": "English"}],
        "sameAs": [u for n, u, p in SOCIAL if n != "WhatsApp"],
        "knowsAbout": ["Web development", "Web design", "Graphic design", "UI/UX design", "E-commerce", "Brand design", "Search engine optimisation"],
        "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Baiden Creatives services and packages", "itemListElement": offers},
        "workExample": [{"@id": u.rstrip("/") + "/#site"} for _, _, _, u, _ in PROJECTS],
    }


def common_nodes():
    place = {"@type": "Place", "name": "East Legon, Accra, Ghana",
             "address": {"@type": "PostalAddress", "addressLocality": "East Legon, Accra", "addressRegion": "Greater Accra Region", "addressCountry": "GH"}}
    return [
        org_node(),
        {"@type": "Person", "@id": DOMAIN + "/#david", "name": "Baiden David", "jobTitle": "Co-founder",
         "worksFor": {"@id": DOMAIN + "/#organization"}, "workLocation": place},
        {"@type": "Person", "@id": DOMAIN + "/#daniel", "name": "Baiden Daniel", "jobTitle": "Co-founder",
         "worksFor": {"@id": DOMAIN + "/#organization"}, "workLocation": place},
        {"@type": "WebSite", "@id": DOMAIN + "/#website", "url": DOMAIN + "/", "name": NAME, "inLanguage": "en-GH",
         "publisher": {"@id": DOMAIN + "/#organization"}},
        {"@type": "ImageObject", "@id": DOMAIN + "/#logo-wordmark", "url": DOMAIN + "/assets/baiden-creatives-logo.png",
         "contentUrl": DOMAIN + "/assets/baiden-creatives-logo.png", "width": 1560, "height": 551, "encodingFormat": "image/png",
         "name": "Baiden Creatives logo", "caption": "Baiden Creatives logo: a black circle with a B monogram beside the wordmark Baiden Creatives",
         "copyrightHolder": {"@id": DOMAIN + "/#organization"}, "contentLocation": place},
    ]


def project_nodes():
    return [{"@type": "WebSite", "@id": u.rstrip("/") + "/#site", "name": n.replace("&amp;", "&"), "url": u, "description": d,
             "creator": {"@id": DOMAIN + "/#organization"}} for _, n, d, u, _ in PROJECTS]


def page_nodes(path, title, desc, kind="WebPage", crumbs=None, extra=None):
    url = DOMAIN + path
    nodes = common_nodes()
    page = {"@type": kind, "@id": url + "#webpage", "url": url, "name": title, "description": desc,
            "isPartOf": {"@id": DOMAIN + "/#website"}, "about": {"@id": DOMAIN + "/#organization"},
            "primaryImageOfPage": {"@type": "ImageObject", "url": DOMAIN + "/assets/og.png"},
            "image": {"@id": DOMAIN + "/#logo-wordmark"}, "inLanguage": "en-GH",
            "datePublished": "2026-09-30", "dateModified": TODAY}
    if crumbs:
        page["breadcrumb"] = {"@id": url + "#breadcrumb"}
        items = [{"@type": "ListItem", "position": i + 1, "name": n, "item": DOMAIN + p} for i, (n, p) in enumerate(crumbs)]
        nodes.append({"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": items})
    nodes.append(page)
    if extra:
        nodes += extra
    return nodes


def jsonld(nodes):
    return '<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": nodes},
                                                              ensure_ascii=False, separators=(",", ":")) + "</script>"


def faq_node(url):
    return {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQS]}


# ---------- layout ----------
def head(path, title, desc):
    url = DOMAIN + path
    return f'''<!doctype html>
<html lang="en-GH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="author" content="{NAME}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="GH-AA">
<meta name="geo.placename" content="East Legon, Accra, Ghana">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en-GH" href="{url}">
<link rel="alternate" hreflang="x-default" href="{url}">
<link rel="alternate" type="text/plain" href="{DOMAIN}/llms.txt" title="LLM-readable summary">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/icon-192.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="application-name" content="{NAME}">
<meta name="apple-mobile-web-app-title" content="{NAME}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{NAME}">
<meta property="og:locale" content="en_GH">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{DOMAIN}/assets/og.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Baiden Creatives: Your business. Digitally elevated.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(desc)}">
<meta name="twitter:image" content="{DOMAIN}/assets/og.png">
<meta name="twitter:image:alt" content="Baiden Creatives: Your business. Digitally elevated.">
'''


def head_end(nodes):
    return f'''{jsonld(nodes)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css?v={V}">
</head>
'''


def header(active):
    cur = ' aria-current="page"'
    links = "".join(f'<a href="{p}"{cur if p == active else ""}>{n}</a>' for n, p in NAV)
    cta_cur = ' aria-current="page"' if active == "/start-a-project" else ""
    return f'''<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav" id="nav">
  <div class="wrap">
    <a href="/" class="logo" aria-label="Baiden Creatives home"><img src="/assets/baiden-creatives-logo-white.png" alt="Baiden Creatives" width="140" height="38"></a>
    <nav id="menu" aria-label="Main">
      {links}
      <a href="/start-a-project" class="btn sm"{cta_cur}>Start a project</a>
    </nav>
    <button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
  </div>
</header>
'''


def footer():
    pages = "".join(f'<a href="{p}">{n}</a>' for n, p in NAV) + '<a href="/start-a-project">Start a project</a>'
    return f'''<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <img src="/assets/baiden-creatives-logo-white.png" alt="Baiden Creatives" width="140" height="38" loading="lazy">
        <p>A digital creative studio in East Legon, Accra. Web development, web design and graphic design for businesses across Ghana.</p>
      </div>
      <div><h4>Pages</h4>{pages}</div>
      <div><h4>Contact</h4>
        <a href="mailto:{EMAIL}">{EMAIL}</a>
        <a href="tel:{PHONE_INTL}">{PHONE_DISPLAY}</a>
        <a href="{MAPS}" target="_blank" rel="noopener">East Legon, Accra, Ghana</a>
      </div>
      <div><h4>Follow @baidencreatives</h4>{social_links()}</div>
    </div>
    <div class="fbar"><span>© <span id="yr">2026</span> {NAME}. All rights reserved.</span><a href="{DOMAIN}">baidencreatives.org</a></div>
  </div>
</footer>
<script src="/script.js?v={V}"></script>
</body>
</html>
'''


def cta_band(title="Have a project in mind?"):
    return f'''<section class="cta">
  <div class="wrap">
    <h2>{title}</h2>
    <div class="actions"><a class="btn" href="/start-a-project">Start a project</a><a class="btn ghost" href="{WA}" target="_blank" rel="noopener">WhatsApp us</a></div>
  </div>
</section>
'''


def phead(crumb, h1, lead):
    return f'''<section class="phead">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>{crumb}</span></nav>
    <h1>{h1}</h1>
    <p class="lead">{lead}</p>
  </div>
</section>
'''


def service_cards():
    out = []
    for i, (n, d, items) in enumerate(SERVICES):
        lis = "".join(f"<li>{e(x)}</li>" for x in items)
        out.append(f'<article class="card{" hi" if i == 1 else ""}"><span class="num">0{i+1}</span><h3>{n}</h3><p>{d}</p><ul>{lis}</ul></article>')
    return '<div class="cards">' + "".join(out) + "</div>"


def work_card(p):
    k, n, d, u, t = p
    host = u.replace("https://", "").rstrip("/")
    plain = n.replace("&", "and")
    return f'''<article class="work {k}">
      <div class="shot">
        <div class="mock-bar" aria-hidden="true"><i></i><i></i><i></i><em>{e(host)}</em></div>
        <div class="frame"><span class="mock-title" aria-hidden="true">{e(t)}</span><iframe src="{u}" title="{e(plain)} website preview" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe></div>
        <a class="cover" href="{u}" target="_blank" rel="noopener" aria-label="Open {e(plain)} (new tab)"><span class="visit">Visit site ↗</span></a>
      </div>
      <div class="meta"><div><h3><a href="{u}" target="_blank" rel="noopener">{e(n)}</a></h3><p>{e(d)}</p></div><span>Web design · Development</span></div>
    </article>'''


def wrap_page(path, title, desc, nodes, body):
    return head(path, title, desc) + head_end(nodes) + header(path) + '<main id="main">\n' + body + "</main>\n" + footer()


# ---------- pages ----------
def home():
    path = "/"
    title = "Baiden Creatives | Web Design, Web Development & Graphic Design in East Legon, Accra"
    desc = ("Baiden Creatives is a digital creative studio in East Legon, Accra, Ghana, founded by Baiden David and "
            "Baiden Daniel. Web development, web design and graphic design for businesses across Ghana.")
    nodes = page_nodes(path, title, desc) + project_nodes()
    feat = "".join(work_card(p) for p in PROJECTS if p[0] in FEATURED)
    sectors = "".join(f"<li><i>{i+1:02d}</i><span>{e(s)}</span></li>" for i, s in enumerate(SECTORS))
    body = f'''<section class="hero">
  <canvas id="net" aria-hidden="true"></canvas>
  <div class="grid-bg"></div>
  <div class="wrap">
    <p class="eyebrow rv" style="--d:0">Digital creative studio · East Legon, Accra</p>
    <h1><span>Your business.</span><span class="soft">Digitally elevated.</span></h1>
    <p class="lead rv" style="--d:3">We design, build and launch websites, web apps and brand visuals for businesses in Accra and across Ghana.</p>
    <div class="actions rv" style="--d:4"><a class="btn" href="/start-a-project">Start a project</a><a class="btn ghost" href="/work">See what we do</a></div>
  </div>
  <div class="scrollhint" aria-hidden="true"><span>Scroll</span><i></i></div>
  <div class="ticker" aria-hidden="true"><div class="track">{"".join(f"<span>{w}</span>" for _ in range(4) for w in ("Design", "Build", "Launch", "Grow"))}</div></div>
</section>

<section class="sec">
  <div class="wrap intro">
    <div>
      <p class="eyebrow">Who we are</p>
      <h2>A studio that helps businesses and organisations look established online.</h2>
    </div>
    <div>
      <p>Baiden Creatives was founded by Baiden David and Baiden Daniel in East Legon, Accra. We combine design and technology to build websites, web apps and brand visuals that work for the people who use them.</p>
      <a class="more" href="/about">About Baiden Creatives</a>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">What we do</p><h2>Three disciplines under one roof</h2></div><a class="more" href="/work">See all services and work</a></div>
    {service_cards()}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Portfolio</p><h2>Recent work</h2></div><a class="more" href="/work">View all work</a></div>
    <div class="works three">
    {feat}
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Clients</p><h2>Who we work with</h2></div></div>
    <ul class="aud">{sectors}</ul>
  </div>
</section>

{cta_band()}'''
    return path, wrap_page(path, title, desc, nodes, body)


def about():
    path = "/about"
    title = "About Baiden Creatives | Founders Baiden David & Baiden Daniel, East Legon, Accra"
    desc = ("Meet Baiden David and Baiden Daniel, the founders of Baiden Creatives, a web design, web development "
            "and graphic design studio in East Legon, Accra, Ghana.")
    nodes = page_nodes(path, title, desc, kind="AboutPage", crumbs=[("Home", "/"), ("About", "/about")])
    points = "".join(f'<div class="point"><h3>{h}</h3><p>{p}</p></div>' for h, p in [
        ("Clear scope", "We agree what is being built, what it costs and when it launches before any design work starts."),
        ("Built for phones first", "Most of your customers will see your site on a phone, so that is where we start."),
        ("Ready to launch", "Domain, hosting, SSL, analytics and search setup are part of the job, not an afterthought."),
    ])
    body = phead("About", "A digital studio built by two founders.",
                 "Baiden Creatives designs and builds websites, web apps and brand visuals for businesses, organisations and individuals across Ghana.") + f'''
<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Founders</p>
    <div class="names">
      <div class="name"><h2>Baiden David</h2><span>Co-founder</span></div>
      <div class="name"><h2>Baiden Daniel</h2><span>Co-founder</span></div>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap intro">
    <div>
      <p class="eyebrow">Our story</p>
      <h2>We build digital presence that reflects the value of what you offer.</h2>
    </div>
    <div>
      <p>Baiden Creatives is a web and graphic design studio in East Legon, Accra. We started with a simple idea: every business deserves a website and a brand that look as good as the work behind them.</p>
      <p>Today we build business websites, online stores, booking systems and custom web applications, and design the flyers, social graphics and brand materials that go with them.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">How we work</p><h2>What you can expect from us</h2></div></div>
    <div class="points">{points}</div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <dl class="facts">
      <div><dt>Studio</dt><dd>East Legon, Accra, Ghana</dd></div>
      <div><dt>Services</dt><dd>Web development, web design, graphic design</dd></div>
      <div><dt>Clients</dt><dd>Businesses, organisations and individuals across Ghana</dd></div>
      <div><dt>Contact</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
    </dl>
  </div>
</section>

{cta_band("Let's work together.")}'''
    return path, wrap_page(path, title, desc, nodes, body)


def work():
    path = "/work"
    title = "Our Work & Services | Baiden Creatives, East Legon, Accra"
    desc = ("Selected work by Baiden Creatives: websites for brands, churches, shops and creators, plus the web "
            "development, web design and graphic design services we offer from East Legon, Accra.")
    nodes = page_nodes(path, title, desc, crumbs=[("Home", "/"), ("Work", "/work")]) + project_nodes()
    cards = "".join(work_card(p) for p in PROJECTS)
    body = phead("Work", "What we do and what we have built.",
                 "Our services, and a selection of live websites we have designed and developed.") + f'''
<section class="sec" id="services">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Services</p><h2>What we do</h2></div><a class="more" href="/start-a-project">Start a project</a></div>
    {service_cards()}
  </div>
</section>

<section class="sec alt" id="selected-work">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Portfolio</p><h2>Selected work</h2></div></div>
    <div class="works">
    {cards}
    </div>
  </div>
</section>

{cta_band()}'''
    return path, wrap_page(path, title, desc, nodes, body)


def pricing():
    path = "/pricing"
    title = "Website Packages & Pricing | Baiden Creatives, East Legon, Accra"
    desc = ("Website packages from Baiden Creatives in East Legon, Accra: Starter, Business, Professional, "
            "E-Commerce and custom web applications, with clear payment terms.")
    nodes = page_nodes(path, title, desc, crumbs=[("Home", "/"), ("Pricing", "/pricing")], extra=[faq_node(DOMAIN + path)])
    cards = []
    for n, best, pre, price, num, feat, items in PLANS:
        lis = "".join(f"<li>{e(x)}</li>" for x in items)
        cards.append(f'''<article class="pcard{" featured" if feat else ""}"><span class="tag">{"Most popular" if feat else "&nbsp;"}</span><h3>{n}</h3><p class="best">{e(best)}</p><div class="price"><small>{pre or "&nbsp;"}</small><span>GH₵</span>{price}</div><ul>{lis}</ul><a href="/start-a-project" class="btn{"" if feat else " ghost"}">Get started</a></article>''')
    faq = "".join(f'<details><summary><span>{e(q)}</span><i aria-hidden="true">+</i></summary><p>{e(a)}</p></details>' for q, a in FAQS)
    body = phead("Pricing", "Website packages.",
                 "Clear starting points for every size of project. Tell us what you need and we will quote it properly.") + f'''
<section class="sec">
  <div class="wrap">
    <div class="plans">{"".join(cards)}</div>
    <p class="lead" style="margin-top:2rem">Also offering graphic design, brand design and website care plans. Prices are starting points. <a class="more" href="/start-a-project">Contact us for a quote</a></p>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">FAQ</p><h2>Frequently asked questions</h2></div></div>
    <div class="faq">{faq}</div>
  </div>
</section>

{cta_band()}'''
    return path, wrap_page(path, title, desc, nodes, body)


def start():
    path = "/start-a-project"
    title = "Start a Project | Baiden Creatives, East Legon, Accra"
    desc = ("Start a project with Baiden Creatives. Tell us about your website, web app or design project and we "
            "will reply by WhatsApp or email. Based in East Legon, Accra.")
    nodes = page_nodes(path, title, desc, kind="ContactPage", crumbs=[("Home", "/"), ("Start a project", "/start-a-project")])
    ig = SOCIAL[0][1]
    body = phead("Start a project", "Start a project.",
                 "Tell us about your idea. We reply on WhatsApp or email, usually within a day.") + f'''
<section class="sec">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Contact</p>
      <h2 style="margin-bottom:1.5rem">Talk to us directly</h2>
      <div class="links">
        <a href="{WA}" target="_blank" rel="noopener"><small>WhatsApp</small>{PHONE_DISPLAY}</a>
        <a href="tel:{PHONE_INTL}"><small>Call</small>+233 55 836 2423</a>
        <a href="mailto:{EMAIL}"><small>Email</small>{EMAIL}</a>
        <a href="{MAPS}" target="_blank" rel="noopener"><small>Studio</small>East Legon, Accra</a>
        <a href="{ig}" target="_blank" rel="noopener me"><small>Instagram and TikTok</small>@baidencreatives</a>
      </div>
    </div>
    <div id="tell-us">
      <p class="eyebrow">Project brief</p>
      <h2 style="margin-bottom:1.5rem">Tell us about your project</h2>
      <form class="form" id="form">
        <div><label for="f-name">Your name</label><input id="f-name" name="name" required autocomplete="name"></div>
        <div><label for="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="full"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        <div><label for="f-service">Service</label><select id="f-service" name="service"><option>Web Development</option><option>Web Design</option><option>Graphic Design</option><option>Full package</option></select></div>
        <div><label for="f-budget">Budget</label><select id="f-budget" name="budget"><option>Not sure yet</option><option>Under GH₵5,000</option><option>GH₵5,000 to GH₵10,000</option><option>GH₵10,000 and above</option></select></div>
        <div class="full"><label for="f-msg">About your project</label><textarea id="f-msg" name="msg" rows="6" required placeholder="What do you want to build, and when do you need it?"></textarea></div>
        <div class="full actions"><button class="btn" type="submit">Send by email</button><button class="btn ghost" type="button" id="wa">Message on WhatsApp</button></div>
      </form>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">What happens next</p><h2>From message to launch</h2></div></div>
    <ol class="steps">
      <li><b>1. We reply</b>We read your brief and get back to you on WhatsApp or email.</li>
      <li><b>2. We scope it</b>You get a clear package, timeline and price before anything starts.</li>
      <li><b>3. We build and launch</b>Design, development and launch setup, with you reviewing along the way.</li>
    </ol>
  </div>
</section>'''
    return path, wrap_page(path, title, desc, nodes, body)


def not_found():
    body = '''<section class="phead" style="min-height:70vh;display:flex;align-items:center"><div class="wrap">
    <p class="eyebrow">Error 404</p><h1>Page not found.</h1>
    <p class="lead" style="margin-bottom:1.5rem">The page you are looking for does not exist or has moved.</p>
    <div class="actions"><a class="btn" href="/">Back to home</a><a class="btn ghost" href="/start-a-project">Start a project</a></div></div></section>'''
    html = (head("/404", "Page not found | Baiden Creatives", "This page could not be found.").replace(
        '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
        '<meta name="robots" content="noindex">')
        + head_end(common_nodes()[:1]) + header("") + '<main id="main">\n' + body + "</main>\n" + footer())
    return "/404", html


# ---------- sitemap, robots ----------
def sitemap():
    pages = [("/", "1.0", "weekly"), ("/about", "0.8", "monthly"), ("/work", "0.9", "weekly"),
             ("/pricing", "0.8", "monthly"), ("/start-a-project", "0.9", "monthly")]
    imgs = {
        "/": [("assets/baiden-creatives-logo.png", "Baiden Creatives logo", "Baiden Creatives logo: a black circle with a B monogram beside the wordmark"),
              ("assets/og.png", "Baiden Creatives: Your business. Digitally elevated.", "")],
    }
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for p, pr, cf in pages:
        loc = DOMAIN + (p if p != "/" else "/")
        out.append("  <url>")
        out.append(f"    <loc>{loc}</loc>")
        out.append(f"    <lastmod>{TODAY}</lastmod>")
        out.append(f"    <changefreq>{cf}</changefreq>")
        out.append(f"    <priority>{pr}</priority>")
        out.append(f'    <xhtml:link rel="alternate" hreflang="en-GH" href="{loc}"/>')
        out.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{loc}"/>')
        for src, t, c in imgs.get(p, []):
            out.append(f"    <image:image><image:loc>{DOMAIN}/{src}</image:loc><image:title>{e(t)}</image:title>" +
                       (f"<image:caption>{e(c)}</image:caption>" if c else "") + "</image:image>")
        out.append("  </url>")
    out.append("</urlset>")
    return "\n".join(out) + "\n"


SITEMAP_XSL = '''<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="utf-8"><title>Sitemap | Baiden Creatives</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{margin:0;background:#000;color:#fff;font:16px/1.6 system-ui,sans-serif;padding:4rem 6vw}
h1{font-size:2.4rem;margin:0 0 .4rem;letter-spacing:-.03em}p{color:#a3a3a3;margin:0 0 2rem}
table{width:100%;max-width:960px;border-collapse:collapse}th{text-align:left;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;color:#a3a3a3;padding:.8rem 0;border-bottom:1px solid #333}
td{padding:1rem 0;border-bottom:1px solid #222}a{color:#fff}a:hover{opacity:.7}
</style></head><body>
<h1>Baiden Creatives sitemap</h1>
<p>baidencreatives.org: <xsl:value-of select="count(sm:urlset/sm:url)"/> pages for search engines.</p>
<table><tr><th>Page</th><th>Updated</th><th>Priority</th></tr>
<xsl:for-each select="sm:urlset/sm:url"><tr>
<td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
<td><xsl:value-of select="sm:lastmod"/></td><td><xsl:value-of select="sm:priority"/></td></tr></xsl:for-each>
</table></body></html>
</xsl:template></xsl:stylesheet>
'''


def robots():
    bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot",
            "Google-Extended", "Applebot-Extended"]
    s = "User-agent: *\nAllow: /\n\n# AI and generative search crawlers are welcome\n"
    s += "".join(f"User-agent: {b}\nAllow: /\n" for b in bots)
    s += f"\nSitemap: {DOMAIN}/sitemap.xml\n"
    return s


def main():
    for path, html in (home(), about(), work(), pricing(), start(), not_found()):
        name = "index.html" if path == "/" else path.strip("/") + ".html"
        (ROOT / name).write_text(html, encoding="utf-8")
        print("wrote", name)
    (ROOT / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    (ROOT / "sitemap.xsl").write_text(SITEMAP_XSL, encoding="utf-8")
    (ROOT / "robots.txt").write_text(robots(), encoding="utf-8")
    print("wrote sitemap.xml, sitemap.xsl, robots.txt")


if __name__ == "__main__":
    main()
