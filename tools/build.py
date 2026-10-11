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
V = "42"  # asset version, bump to bust caches

NAME = "Baiden Creatives"
EMAIL = "edstudios77@gmail.com"
PHONE_DISPLAY = "0558 362 423"
PHONE_INTL = "+233558362423"
WA = "https://wa.me/233558362423"
MAPS = "https://www.google.com/maps/search/?api=1&query=East+Legon+Accra+Ghana"

SOCIAL = [
    ("Instagram", 'https://www.instagram.com/baidencreatives',
     "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"),
    ("TikTok", 'https://www.tiktok.com/@baidencreatives',
     "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"),
    ("X", 'https://x.com/baidencreatives',
     "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"),
    ("WhatsApp", WA,
     "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"),
]

NAV = [("Home", "/"), ("About", "/about"), ("Organisations", "/organisations"), ("Work", "/work"), ("Pricing", "/pricing")]

PROJECTS = [
    ("boomiis", "BOOMiiS Restaurant", "Restaurant website, East Legon", "https://boomiisgh.com", "West Africa, in the heart of Accra."),
    ("csc", "Christian Service Church", "Church website, East Legon", "https://www.christianservicechurch.org", "Christian Service Church. House of Testimonies."),
    ("baidx", "BAID X", "Work network website, owned by Baiden Creatives", "https://www.baid-x.com", "Ghana's work network."),
    ("resilience", "Resilience Estate", "Real estate website, Accra", "https://www.resilienceghana.com", "Real estate and home services in Ghana."),
    ("nobles", "TheNobles Gift & Surprise Hub", "Gift shop website, Accra", "https://nobles-gift-hub-accra.vercel.app", "Say it with a gift."),
    ("vault", "Blackboy's Vault", "Menswear store website, Ghana", "https://blackboys-vault-store.vercel.app", "Fresh fits for the new generation."),
    ("bold", "Bold Restaurant Ghana", "Rooftop restaurant website, Accra", "https://bold-restaurant-ghana.vercel.app", "The restaurant your friends keep telling you about."),
    ("eat", "EatConnect Ghana", "Food discovery platform", "https://eatconnect.vercel.app/#/discover", "Discover restaurants, cafes and food spots."),
    ("eslyn", "Eslyn Local Kitchen & Pub", "Restaurant website, Adjiringanor", "https://eslyn.vercel.app", "Good food. Great company."),
    ("ompad", "Ompad Media", "Media website", "https://ompadmedia.netlify.app", "Ompad Media"),
]
FEATURED = ["boomiis", "csc", "bold"]  # unused on home now (carousel shows all)

# Organisations owned by Baiden Creatives (the parent). Add new ones here.
ORGS = [
    ("baidx", "BAID X", "Work network", "https://www.baid-x.com", "Ghana's work network.",
     "BAID X lets you hire verified professionals across all 16 regions of Ghana, with payments held in escrow until the work is approved."),
]

BRAND = [
    ("Christian Service Church", [
        ("csc-website-now-live", "Website launch flyer", "Now live: the church website launch announcement"),
        ("csc-sunday-service-flyer", "Sunday service flyer", "Sunday service invitation flyer"),
        ("csc-the-word-online", "Sermons flyer", "The Word Online: sermons and daily devotions flyer"),
        ("csc-21-days-fasting-prayer", "Event flyer", "21 Days of Fasting and Prayer event flyer"),
    ]),
    ("BAID X", [
        ("baidx-launch-flyer-1", "Launch flyer", "BAID X launch flyer, how it works"),
        ("baidx-launch-flyer-2", "Launch flyer", "BAID X launch flyer for buyers and suppliers"),
        ("baidx-launch-flyer-3", "Launch flyer", "BAID X launch flyer for companies and project managers"),
        ("baidx-app-coming-soon", "App announcement", "BAID X app coming soon announcement"),
    ]),
    ("Eslyn Local Kitchen & Pub", [
        ("eslyn-logo", "Logo", "Eslyn Local Kitchen and Pub logo"),
        ("eslyn-banku-tilapia-promo", "Social media post", "Banku and tilapia promo post"),
        ("eslyn-special-meal-friday", "Social media post", "Special meal Friday promo post"),
        ("eslyn-kitchen-menu-flyer", "Menu flyer", "Eslyn Kitchen menu flyer"),
        ("eslyn-satisfy-your-cravings-menu", "Menu flyer", "Satisfy your cravings menu flyer"),
    ]),
]

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
    path = f'<path d="{path}"/>' if not path.startswith("<") else path
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
        "@type": ["Organization", "LocalBusiness"], "@id": DOMAIN + "/#organization",
        "name": NAME, "alternateName": "Baiden Creative", "url": DOMAIN + "/",
        "logo": {"@type": "ImageObject", "@id": DOMAIN + "/#logo", "url": DOMAIN + "/assets/baiden-creatives-logo-square.png",
                 "contentUrl": DOMAIN + "/assets/baiden-creatives-logo-square.png", "width": 512, "height": 512,
                 "caption": "Baiden Creatives logo"},
        "image": [{"@id": DOMAIN + "/#logo-wordmark"}, DOMAIN + "/assets/og.png"],
        "brand": {"@type": "Brand", "name": NAME, "logo": {"@id": DOMAIN + "/#logo"}},
        "description": "Baiden Creatives is a digital organisation based in East Legon, Accra, Ghana. It provides web development, web design and graphic design for businesses, organisations and entrepreneurs, and owns BAID X.",
        "disambiguatingDescription": "Parent organisation of BAID X",
        "slogan": "Your business. Digitally elevated.",
        "email": EMAIL, "telephone": PHONE_INTL, "address": place_addr,
        "areaServed": [{"@type": "City", "name": "Accra"}, {"@type": "AdministrativeArea", "name": "Greater Accra Region"}, {"@type": "Country", "name": "Ghana"}],
        "location": {"@type": "Place", "name": "Baiden Creatives, East Legon", "address": place_addr, "hasMap": MAPS},
        "knowsLanguage": "en", "priceRange": "GH₵100 – GH₵15,000+", "currenciesAccepted": "GHS",
        "paymentAccepted": "Mobile Money, Bank transfer, Cash",
        "founder": [{"@id": DOMAIN + "/#david"}, {"@id": DOMAIN + "/#daniel"}],
        "subOrganization": [{"@id": u.rstrip("/") + "/#organization"} for _, _, _, u, _, _ in ORGS],
        "owns": [{"@id": u.rstrip("/") + "/#organization"} for _, _, _, u, _, _ in ORGS],
        "contactPoint": [{"@type": "ContactPoint", "telephone": PHONE_INTL, "email": EMAIL, "contactType": "customer service",
                          "areaServed": "GH", "availableLanguage": "English"}],
        "sameAs": [u for n, u, p in SOCIAL if n != "WhatsApp"],
        "knowsAbout": ["Web development", "Web design", "Graphic design", "UI/UX design", "E-commerce", "Brand design", "Search engine optimisation"],
        "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Baiden Creatives services and packages", "itemListElement": offers},
        "workExample": [{"@id": u.rstrip("/") + "/#site"} for _, _, _, u, _ in PROJECTS],
    }


def org_nodes():
    return [{"@type": "Organization", "@id": u.rstrip("/") + "/#organization", "name": n, "url": u, "slogan": t,
             "description": d, "parentOrganization": {"@id": DOMAIN + "/#organization"}} for _, n, _, u, t, d in ORGS]


def common_nodes():
    place = {"@type": "Place", "name": "East Legon, Accra, Ghana",
             "address": {"@type": "PostalAddress", "addressLocality": "East Legon, Accra", "addressRegion": "Greater Accra Region", "addressCountry": "GH"}}
    return [
        org_node(),
        *org_nodes(),
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
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
        <p>A digital organisation in East Legon, Accra. Creative services for businesses across Ghana, and the parent of BAID X.</p>
      </div>
      <div><h4>Pages</h4>{pages}</div>
      <div><h4>Contact</h4>
        <a href="mailto:{EMAIL}">{EMAIL}</a>
        <a href="tel:{PHONE_INTL}">{PHONE_DISPLAY}</a>
        <a href="{MAPS}" target="_blank" rel="noopener">East Legon, Accra, Ghana</a>
      </div>
      <div class="f-social"><h4>Follow @baidencreatives</h4>{social_links()}</div>
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
      <a class="shot" href="{u}" target="_blank" rel="noopener" aria-label="Open {e(plain)} (new tab)">
        <span class="mock-bar" aria-hidden="true"><i></i><i></i><i></i><em>{e(host)}</em></span>
        <img src="/assets/work/sites/{k}.jpg" alt="{e(plain)} website: homepage preview" width="1280" height="800" loading="lazy" decoding="async">
        <span class="visit">Visit site ↗</span>
      </a>
      <div class="meta"><div><h3><a href="{u}" target="_blank" rel="noopener">{e(n)}</a></h3><p>{e(d)}</p></div><span>Web design · Development</span></div>
    </article>'''


def carousel(label, slides, cls=""):
    n = len(slides)
    return f'''<div class="car {cls}" data-car role="region" aria-roledescription="carousel" aria-label="{e(label)}">
      <div class="car-track" tabindex="0">{"".join(slides)}</div>
      <div class="car-ui"><span class="car-count" aria-live="polite">01 <span>/ {n:02d}</span></span>
        <div class="car-btns"><button type="button" class="car-prev" aria-label="Previous">←</button><button type="button" class="car-next" aria-label="Next">→</button></div></div>
    </div>'''


SLIDE_IMG = [("/assets/work/sites/boomiis.jpg", "BOOMiiS restaurant website homepage", ""),
             ("/assets/work/sites/baidx.jpg", "BAID X website homepage", ""),
             ("/assets/work/csc-website-now-live-thumb.jpg", "Christian Service Church website launch flyer", " flyer")]


def service_slides():
    out = []
    for i, ((n, d, items), (src, alt, cls)) in enumerate(zip(SERVICES, SLIDE_IMG)):
        lis = "".join(f"<li>{e(x)}</li>" for x in items)
        out.append(f'''<article class="slide" aria-label="{i+1} of {len(SERVICES)}"><div><span class="num">0{i+1}</span><h3>{n}</h3><p>{d}</p><ul>{lis}</ul><a class="more" href="/work">See examples</a></div><div class="slide-img{cls}"><img src="{src}" alt="{e(alt)}" loading="lazy" decoding="async"></div></article>''')
    return out


def org_cards():
    out = []
    for k, n, kind, u, t, d in ORGS:
        plain = n.replace("&", "and")
        out.append(f'''<article class="orgx-card {k}">
      <div class="orgx-body">
        <span class="badge">Owned by Baiden Creatives</span>
        <h3>{e(n)}</h3>
        <p class="tagline">{e(t)}</p>
        <p>{e(d)}</p>
        <a class="btn" href="{u}" target="_blank" rel="noopener">Visit {e(n)} ↗</a>
      </div>
    </article>''')
    return "".join(out)


def org_feature():
    kids = "".join(f'<li class="ot-kid"><span>Owned organisation</span><b>{e(n)}</b></li>' for _, n, _, _, _, _ in ORGS)
    return f'''<div class="orgx">
      <div class="orgx-tree">
        <div class="ot-parent"><span>Parent organisation</span><b>Baiden Creatives</b></div>
        <ul class="ot-kids">
          <li class="ot-kid"><span>Division</span><b>Creative services</b></li>
          {kids}
          <li class="ot-kid soon"><span>Further organisations</span><b>To be announced</b></li>
        </ul>
      </div>
      {org_cards()}
    </div>'''


def brand_section():
    sizes = json.loads((ROOT / "tools" / "work-sizes.json").read_text())
    groups = []
    for client, items in BRAND:
        figs = []
        for f, kind, alt in items:
            w, h = sizes[f]
            figs.append(f'''<figure><button type="button" data-full="/assets/work/{f}.jpg" data-cap="{e(client)}: {e(kind)}" aria-label="View larger: {e(alt)}"><img src="/assets/work/{f}-thumb.jpg" alt="{e(alt)}" width="{w}" height="{h}" loading="lazy" decoding="async"></button><figcaption><b>{e(client)}</b><span>{e(kind)}</span></figcaption></figure>''')
        groups.append(f'<div class="bgroup"><h3>{e(client)}</h3><div class="gallery">{"".join(figs)}</div></div>')
    return f'''<section class="sec" id="branding">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Branding and design</p><h2>Logos, flyers and social graphics</h2></div><a class="more" href="/start-a-project">Start a project</a></div>
    {"".join(groups)}
    <p class="lead" style="margin-top:2rem">A selection of branding and design work for clients. More is added regularly.</p>
  </div>
</section>
<dialog id="lb" aria-label="Image viewer"><button type="button" class="lb-x" aria-label="Close">×</button><button type="button" class="lb-n lb-prev" aria-label="Previous">←</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-n lb-next" aria-label="Next">→</button></dialog>'''


def wrap_page(path, title, desc, nodes, body):
    return head(path, title, desc) + head_end(nodes) + header(path) + '<main id="main">\n' + body + "</main>\n" + footer()


# ---------- pages ----------
def home():
    path = "/"
    title = "Baiden Creatives | Digital Organisation in East Legon, Accra, Ghana"
    desc = ("Baiden Creatives is a digital organisation in East Legon, Accra, Ghana, founded by Baiden David and "
            "Baiden Daniel. Web design, web development, graphic design, and the parent of BAID X.")
    nodes = page_nodes(path, title, desc) + project_nodes()
    proj_slides = [f'<div class="pslide">{work_card(p)}</div>' for p in PROJECTS]
    sectors = ", ".join(f"<em>{e(s)}</em>" if i in (0, 3, 10) else e(s) for i, s in enumerate(SECTORS[:-1])) + " and " + e(SECTORS[-1])
    body = f'''<section class="hero">
  <canvas id="net" aria-hidden="true"></canvas>
  <div class="grid-bg"></div>
  <div class="wrap">
    <p class="eyebrow rv" style="--d:0">Organisation · East Legon, Accra, Ghana</p>
    <h1><span>Your business.</span><span class="soft">Digitally elevated.</span></h1>
    <p class="lead rv" style="--d:3">Baiden Creatives is an organisation in Accra that builds websites, web apps and brands for clients, and owns BAID X.</p>
    <div class="actions rv" style="--d:4"><a class="btn" href="/start-a-project">Start a project</a><a class="btn ghost" href="/work">See what we do</a></div>
  </div>
  <div class="scrollhint" aria-hidden="true"><span>Scroll</span><i></i></div>
  <div class="ticker" aria-hidden="true"><div class="track">{"".join(f"<span>{w}</span>" for _ in range(4) for w in ("Design", "Build", "Launch", "Grow"))}</div></div>
</section>

<section class="sec">
  <div class="wrap intro">
    <div>
      <p class="eyebrow">Who we are</p>
      <h2>An organisation building digital products and brands for Ghana.</h2>
    </div>
    <div>
      <p>Baiden Creatives was founded by Baiden David and Baiden Daniel in East Legon, Accra. It delivers creative services to businesses and organisations, and it owns BAID X, a workforce platform that sits under it as its own organisation.</p>
      <a class="more" href="/organisations">Our organisations</a>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">The organisation</p><h2>One parent, organisations of its own</h2></div><a class="more" href="/organisations">How the group fits together</a></div>
    {org_feature()}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">What we do</p><h2>Creative services for clients</h2></div><a class="more" href="/work">All services</a></div>
    {carousel("What we do", service_slides())}
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Portfolio</p><h2>Selected work</h2></div><a class="more" href="/work">View all work</a></div>
    {carousel("Selected work", proj_slides, "proj")}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Who we work with</p>
    <p class="sectors">{sectors}.</p>
  </div>
</section>

{cta_band()}'''
    return path, wrap_page(path, title, desc, nodes, body)


def about():
    path = "/about"
    title = "About Baiden Creatives | Organisation Founded by Baiden David & Baiden Daniel"
    desc = ("Baiden Creatives is an organisation in East Legon, Accra, Ghana, founded by Baiden David and Baiden Daniel. "
            "It provides creative services and owns BAID X.")
    nodes = page_nodes(path, title, desc, kind="AboutPage", crumbs=[("Home", "/"), ("About", "/about")])
    points = "".join(f'<div class="point"><h3>{h}</h3><p>{p}</p></div>' for h, p in [
        ("Clear scope", "We agree what is being built, what it costs and when it launches before any design work starts."),
        ("Built for phones first", "Most of your customers will see your site on a phone, so that is where we start."),
        ("Ready to launch", "Domain, hosting, SSL, analytics and search setup are part of the job, not an afterthought."),
    ])
    body = phead("About", "An organisation built by two founders.",
                 "Baiden Creatives is a Ghanaian organisation founded by Baiden David and Baiden Daniel. It delivers creative services for clients and owns BAID X.") + f'''
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
      <p>Baiden Creatives is an organisation based in East Legon, Accra. Its creative services build business websites, online stores, booking systems and custom web applications, and design the flyers, social graphics and brand materials that go with them.</p>
      <p>Baiden Creatives also owns BAID X, a platform that connects skilled professionals with businesses and project teams. Each organisation under Baiden Creatives has its own brand and focus. <a class="more" href="/organisations">See the structure</a></p>
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
      <div><dt>Headquarters</dt><dd>East Legon, Accra, Ghana</dd></div>
      <div><dt>Owns</dt><dd>BAID X</dd></div>
      <div><dt>Services</dt><dd>Web development, web design, graphic design</dd></div>
      <div><dt>Contact</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
    </dl>
  </div>
</section>

{cta_band("Let's work together.")}'''
    return path, wrap_page(path, title, desc, nodes, body)


def organisations():
    path = "/organisations"
    title = "Our Organisations | Baiden Creatives and BAID X, East Legon, Accra"
    desc = ("Baiden Creatives is the parent organisation. See the organisations under it, including BAID X, "
            "and how the group fits together.")
    nodes = page_nodes(path, title, desc, crumbs=[("Home", "/"), ("Organisations", "/organisations")])
    children = "".join(f'<li><span>Organisation</span><b>{e(n)}</b><em>{e(kind)}</em></li>' for _, n, kind, _, _, _ in ORGS)
    body = phead("Organisations", "One parent. Organisations of its own.",
                 "Baiden Creatives is the parent organisation. It delivers creative services for clients and owns the organisations listed here.") + f'''
<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Structure</p>
    <div class="tree">
      <div class="tree-parent"><span>Parent organisation</span><b>Baiden Creatives</b><em>East Legon, Accra, Ghana</em></div>
      <div class="tree-line" aria-hidden="true"></div>
      <ul class="tree-kids">
        <li class="svc"><span>Creative services</span><b>Web, design and brand</b><em>Web development, web design, graphic design</em></li>
        {children}
      </ul>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Owned organisations</p><h2>Under Baiden Creatives</h2></div></div>
    {org_cards()}
    <p class="lead" style="margin-top:2rem">Each organisation under Baiden Creatives has its own brand, website and focus. Founded by Baiden David and Baiden Daniel.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap intro">
    <div><p class="eyebrow">Creative services</p><h2>The services arm of the organisation</h2></div>
    <div>
      <p>Baiden Creatives builds websites, web apps and brand visuals for businesses, organisations and individuals across Ghana.</p>
      <a class="more" href="/work">See services and work</a>
    </div>
  </div>
</section>

{cta_band("Work with the organisation.")}'''
    return path, wrap_page(path, title, desc, nodes, body)


def work():
    path = "/work"
    title = "Our Work & Services | Baiden Creatives, East Legon, Accra"
    desc = ("Selected work by Baiden Creatives: websites for brands, churches, shops and creators, plus the web "
            "development, web design and graphic design services we offer from East Legon, Accra.")
    nodes = page_nodes(path, title, desc, crumbs=[("Home", "/"), ("Work", "/work")]) + project_nodes()
    cards = "".join(work_card(p) for p in PROJECTS)
    body = phead("Work", "What we do and what we have built.",
                 "Our services, a selection of live websites we have designed and developed, and branding work for clients.") + f'''
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

{brand_section()}

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
        <a href="{MAPS}" target="_blank" rel="noopener"><small>Office</small>East Legon, Accra</a>
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
    pages = [("/", "1.0", "weekly"), ("/about", "0.8", "monthly"), ("/organisations", "0.8", "monthly"), ("/work", "0.9", "weekly"),
             ("/pricing", "0.8", "monthly"), ("/start-a-project", "0.9", "monthly")]
    imgs = {
        "/work": [(f"assets/work/{f}.jpg", f"{c}: {k}", a) for c, items in BRAND for f, k, a in items],
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
    for path, html in (home(), about(), organisations(), work(), pricing(), start(), not_found()):
        name = "index.html" if path == "/" else path.strip("/") + ".html"
        (ROOT / name).write_text(html, encoding="utf-8")
        print("wrote", name)
    (ROOT / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    (ROOT / "sitemap.xsl").write_text(SITEMAP_XSL, encoding="utf-8")
    (ROOT / "robots.txt").write_text(robots(), encoding="utf-8")
    print("wrote sitemap.xml, sitemap.xsl, robots.txt")


if __name__ == "__main__":
    main()
