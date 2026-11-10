"use client";

import { type MouseEvent, useRef, useState } from "react";
import photos from "../../content/gallery.json";

export default function Gallery({discordUrl}: {discordUrl: string}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const selected = current === null ? null : photos[current];

  function openPhoto(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.current?.showModal !== "function") return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setCurrent(index);
    dialog.current.showModal();
  }

  function moveBy(step: number) {
    setCurrent(index => index === null ? null : (index + step + photos.length) % photos.length);
  }

  return <section id="photographs" className="gallery" aria-label="Photographs from mesh.">
    <div className="wrap">
      <a className="discord-link" href={discordUrl}>
        <span className="link-word">Discord</span><span className="link-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="photo-wall">
        {photos.map((photo, index) => <a className="gallery-print" key={photo.filename}
          data-print={photo.filename.split(".")[0]} href={"/gallery/" + photo.filename}
          onClick={event => openPhoto(event, index)} aria-haspopup="dialog" aria-label={"Enlarge photograph. " + photo.alt}>
          <img src={"/gallery/" + photo.filename} width={photo.width} height={photo.height}
            alt={photo.alt} loading="lazy" decoding="async" />
        </a>)}
      </div>
    </div>
    <dialog ref={dialog} className="photo-viewer" aria-label="Photograph viewer"
      onClose={() => { setCurrent(null); opener.current?.focus({preventScroll: true}); }}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          moveBy(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <button type="button" className="viewer-close" aria-label="Close photograph" onClick={() => dialog.current?.close()}>×</button>
      {selected && <figure className="viewer-photo">
        <img src={"/gallery/" + selected.filename} alt={selected.alt} width={selected.width} height={selected.height} />
        <figcaption aria-live="polite">{selected.caption}</figcaption>
      </figure>}
      <button type="button" className="viewer-prev" aria-label="Previous photograph" onClick={() => moveBy(-1)}>←</button>
      <button type="button" className="viewer-next" aria-label="Next photograph" onClick={() => moveBy(1)}>→</button>
    </dialog>
  </section>;
}
