/*
 * Studio wall: branding, campaign, web and app design pieces supplied by Baiden Creatives
 * (branding.zip and hero_and_ui_samples.zip, 12 Oct 2026). Titles only name a client where the name
 * appears in the artwork itself.
 *
 * Deliberately left out: an ad showing a +44 phone number that is not the company's verified contact,
 * and a phone screenshot that is not a design piece.
 */

export type StudioPiece = {
  src: string;
  width: number;
  height: number;
  title: string;
  kind: "Brand identity" | "Campaign" | "Web design" | "App UI";
  alt: string;
};

const p = (file: string, width: number, height: number, title: string, kind: StudioPiece["kind"], alt: string): StudioPiece => ({
  src: `/assets/studio/${file}.jpg`,
  width,
  height,
  title,
  kind,
  alt,
});

export const studio = {
  kwabszzMonogram: p("kwabszz-monogram", 1080, 1080, "Kwabszz", "Brand identity", "Gold K monogram on black for the Kwabszz personal brand"),
  kwabszzCard: p("kwabszz-brand-card", 1080, 1080, "Kwabszz", "Brand identity", "Kwabszz brand card with gold K monogram and social handles"),
  awesomeLogo: p("awesome-events-logo", 1080, 1080, "Awesome Events Center", "Brand identity", "Awesome Events Center logo: a gold A mark above the wordmark"),
  slushify: p("slushify-poster", 720, 1080, "The Slushify", "Campaign", "The Slushify poster: Fresh bites. Cool sips. with a burger, fries and a slush"),
  foodVisual: p("food-campaign-visual", 736, 736, "Food campaign", "Campaign", "Food campaign visual: burger, fried chicken, wraps and lasagne on black"),
  steelJee: p("steel-jee-media-october", 736, 736, "Steel Jee Media", "Campaign", "Steel Jee Media Welcome to October social post"),
  layera: p("layera-concept-ad", 736, 920, "Layera Concept", "Campaign", "Layera Concept advert: Let's handle your next project"),
  foody: p("foody-web", 1080, 809, "Foody", "Web design", "Foody website: It's not just food, it's an experience, with a phone showing the menu"),
  burgerWeb: p("burger-brand-web", 1035, 1080, "Burger brand", "Web design", "Burger restaurant web design: Mind blowing bites and Feel the hype"),
  restaurantDesktop: p("restaurant-site-desktop", 1080, 835, "Restaurant website", "Web design", "Restaurant website shown on a desktop monitor"),
  biteNow: p("bitenow-web", 1080, 809, "BiteNow", "Web design", "BiteNow web design: Grab your favourite meal"),
  healingBird: p("healing-bird-web", 1080, 809, "Healing Bird", "Web design", "Healing Bird product website for an ultra protein hair oil"),
  luxeva: p("luxeva-haircare-web", 719, 1079, "Luxéva", "Web design", "Luxéva haircare online store: Stronger hair, healthier you"),
  cinnamon: p("cinnamon-oil-web", 1000, 750, "Cinnamon essential oil", "Web design", "Essential oil store website featuring cinnamon oil"),
  eventApp: p("event-venue-app", 952, 635, "Event venue booking", "App UI", "Event venue booking app screens: Book that perfect spot"),
  flowerApp: p("flower-shop-app", 1080, 809, "Flower shop", "App UI", "Flower and gift shop app: home, product and checkout screens"),
  furnitureLight: p("furniture-app-light", 1280, 960, "Furniture store", "App UI", "Furniture store app: find unique furniture, product details and cart"),
  furnitureRental: p("furniture-rental-app", 1200, 900, "Furniture rental", "App UI", "Furniture rental app: Rent furniture, live better"),
  barber: p("barber-app", 1200, 900, "Barber booking", "App UI", "Barber booking app: Discover the beauty in you today"),
  furnitureBlue: p("furniture-app-blue", 1280, 960, "Furniture showcase", "App UI", "Furniture showcase app in blue: Hand-pick your furniture"),
};

/** Order used by the hero marquee: alternates identity, campaign, web and app so rows feel varied. */
export const marqueeTop = [
  studio.kwabszzMonogram,
  studio.foody,
  studio.slushify,
  studio.flowerApp,
  studio.awesomeLogo,
  studio.luxeva,
  studio.barber,
  studio.foodVisual,
  studio.healingBird,
];
export const marqueeBottom = [
  studio.furnitureBlue,
  studio.layera,
  studio.biteNow,
  studio.kwabszzCard,
  studio.eventApp,
  studio.steelJee,
  studio.cinnamon,
  studio.furnitureRental,
  studio.burgerWeb,
];

/** Graphic design and identity pieces for the studio wall section. */
export const studioWall = [
  studio.kwabszzMonogram,
  studio.slushify,
  studio.awesomeLogo,
  studio.layera,
  studio.foodVisual,
  studio.steelJee,
  studio.kwabszzCard,
  studio.luxeva,
  studio.burgerWeb,
  studio.foody,
  studio.healingBird,
  studio.cinnamon,
];
