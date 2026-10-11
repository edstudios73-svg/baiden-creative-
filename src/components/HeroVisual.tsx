import Image from "next/image";

/**
 * Art-directed hero composition built only from real work: the BAID X platform, the Blackboy's Vault
 * mobile store and Eslyn's identity, layered around a circle that echoes the logo's monogram.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-[5/4] w-full sm:aspect-[16/11]" aria-label="Selected work: BAID X, Blackboy's Vault and Eslyn" role="group">
      {/* Abstract element: the logo's circle, with a slow orbiting accent. Purely decorative. */}
      <svg className="absolute -top-[6%] -right-[8%] w-[62%] text-ink/15" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 3" />
        <g className="orbit">
          <circle cx="100" cy="2" r="3.2" fill="#c9ff54" stroke="#111318" strokeWidth="0.6" />
        </g>
      </svg>

      <figure className="absolute top-[4%] right-0 w-[84%]">
        <div className="frame aspect-[16/10]">
          <Image
            src="/assets/work/sites/baidx.jpg"
            alt="BAID X, Ghana's work network: homepage"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-cover object-top"
          />
        </div>
        <figcaption className="text-label mt-3 text-right text-graphite">BAID X · Platform</figcaption>
      </figure>

      <figure className="absolute bottom-0 left-0 w-[27%] min-w-[96px]">
        <div className="frame-phone shadow-[0_30px_60px_-25px_rgb(17_19_24/0.55)]">
          <Image
            src="/assets/work/vault/01-home.jpg"
            alt="Blackboy's Vault mobile store: home screen"
            width={585}
            height={1266}
            priority
            sizes="(min-width: 1024px) 16vw, 28vw"
          />
        </div>
        <figcaption className="text-label mt-3 hidden text-graphite sm:block">Blackboy&apos;s Vault · Commerce</figcaption>
      </figure>

      <figure className="absolute right-[6%] bottom-[2%] w-[34%]">
        <div className="frame bg-white">
          <Image
            src="/assets/work/eslyn-logo.jpg"
            alt="Eslyn Local Kitchen and Pub logo"
            width={1080}
            height={663}
            sizes="(min-width: 1024px) 20vw, 34vw"
          />
        </div>
        <figcaption className="text-label mt-3 hidden text-graphite sm:block">Eslyn · Identity</figcaption>
      </figure>
    </div>
  );
}
