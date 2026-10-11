"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/content/types";

/** Image grid with an accessible lightbox built on the native <dialog> element (Escape and focus return are native). */
export function Gallery({ images, label }: { images: Img[]; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));
  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3" aria-label={label}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-6 break-inside-avoid" data-reveal style={{ "--reveal-delay": i % 3 } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`img-zoom block w-full ${img.kind === "phone" ? "frame-phone" : "frame"}`}
              aria-label={`View larger: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        aria-label={current ? current.alt : label}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        {current && (
          <figure className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 p-4 sm:p-10">
            <div className="relative min-h-0 w-full flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="flex w-full max-w-4xl items-center justify-between gap-4 text-sm text-ivory">
              <span>
                <span className="font-mono text-mist">
                  {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <span className="ml-4">{current.alt}</span>
              </span>
              <span className="flex shrink-0 gap-2">
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center border border-ivory/30 hover:border-ivory" aria-label="Previous image">
                      ←
                    </button>
                    <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center border border-ivory/30 hover:border-ivory" aria-label="Next image">
                      →
                    </button>
                  </>
                )}
                <button type="button" onClick={() => setIndex(null)} className="grid size-11 place-items-center bg-ivory text-ink" aria-label="Close image viewer" autoFocus>
                  ×
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
