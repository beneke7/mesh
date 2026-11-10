"use client";

import { useEffect, useRef, useState } from "react";
import { u } from "../../lib/base";

const builds = [
  { title: "AquaLab", image: "/builds/building-aquaLab-01.webp", alt: "An AquaLab underwater robotics prototype." },
  { title: "Resoloon", image: "/builds/building-resoloon-01.webp", alt: "Work on the Resoloon balloon project." },
  { title: "CanSat", image: "/builds/cansat-competition-02.webp", alt: "A can-sized satellite project." },
  { title: "Acoustic thermometry", image: "/builds/thermometer.webp", alt: "An ultrasonic thermometer prototype." },
  { title: "Robotics", image: "/builds/bench-detail.webp", alt: "A builder working on a hardware component." },
  { title: "CAD experiments", image: "/builds/cad-disc.webp", alt: "A circular part being developed in CAD." },
  { title: "Hardware prototypes", image: "/builds/flight.webp", alt: "Exposed wiring on an experimental payload." },
  { title: "Computer vision", image: "/builds/chessboard.webp", alt: "A builder showing a physical and digital chessboard." },
  { title: "Built together", image: "/builds/hack-overhead.webp", alt: "Builders collaborating around a worktable." },
  { title: "Electronics", image: "/builds/parts.webp", alt: "Components and electronics organized for prototyping." },
  { title: "VR experiments", image: "/builds/virtual-reality.webp", alt: "A builder trying a virtual reality headset." },
  { title: "Launch tests", image: "/builds/parachute.webp", alt: "A parachute and experimental flight hardware." },
  { title: "Light experiments", image: "/builds/lamp.webp", alt: "An experimental lamp project." },
  { title: "Workshop", image: "/builds/workshop-door.webp", alt: "The mesh. builderspace workshop." },
  { title: "Demos", image: "/builds/demo-1440.webp", alt: "Builders sharing a project demonstration." },
];
export default function Builds() {
  const gallery = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  function updateEdges() {
    const element = gallery.current;
    if (!element) return;
    const end = element.scrollWidth - element.clientWidth;
    setEdges({ left: element.scrollLeft <= 1, right: element.scrollLeft >= end - 1 });
  }

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;
    element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function scroll(direction: number) {
    const element = gallery.current;
    const tile = element?.querySelector<HTMLElement>(".build-tile");
    const grid = element?.querySelector<HTMLElement>(".build-grid");
    if (!element || !tile || !grid) return;
    const step = tile.offsetWidth + parseFloat(getComputedStyle(grid).columnGap);
    element.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <section className="builds" aria-labelledby="builds-title"><div className="wrap">
    <h2 className="section-title" id="builds-title">Builds</h2>
    </div><div className="build-stage"><div className="build-window" id="build-gallery" ref={gallery} onScroll={updateEdges} tabIndex={0} role="region" aria-label="Build projects, scroll horizontally"><div className="build-grid">
      {builds.map(build => <figure className="build-tile" key={build.title}>
        <img src={u(build.image)} alt={build.alt} width="600" height="600" loading="lazy" decoding="async" />
        <figcaption>{build.title}</figcaption>
      </figure>)}
    </div></div><div className="build-controls">
      <button type="button" aria-label="Scroll builds left" aria-controls="build-gallery" disabled={edges.left} onClick={() => scroll(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12 15 20" /></svg>
      </button>
      <button type="button" aria-label="Scroll builds right" aria-controls="build-gallery" disabled={edges.right} onClick={() => scroll(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
      </button>
  </div></div></section>;
}
