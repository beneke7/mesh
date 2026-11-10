"use client";

import { useEffect, useRef, useState } from "react";
import { u } from "../../lib/base";

const builds = [
  { title: "Resoloon", image: "/builds/balloon.webp", alt: "Two builders launching the Resoloon weather balloon in a field." },
  { title: "Tonekeep", image: "/builds/tonekeep.webp", alt: "A builder wearing ear defenders beside a drum kit and audio hardware." },
  { title: "Holorat", image: "/builds/holorat.webp", alt: "A builder crouching next to an orange robot rover." },
  { title: "Hackathon", image: "/builds/hackathon.webp", alt: "A mesh. team with their robots at a robotics hackathon." },
  { title: "Acoustic thermometry", image: "/builds/thermometer.webp", alt: "An ultrasonic thermometer prototype." },
  { title: "Gaemlabs", image: "/builds/gaemlabs.webp", alt: "Two builders testing virtual reality headsets." },
  { title: "Robotics", image: "/builds/robot-arm.webp", alt: "A robot arm mounted on a test bench." },
  { title: "Smart chessboard", image: "/builds/led-chessboard.webp", alt: "A builder playing on an LED chessboard linked to a projected board." },
  { title: "Electronics", image: "/builds/parts.webp", alt: "Components and electronics organized for prototyping." },
  { title: "LED decor", image: "/builds/led-decor.webp", alt: "A builder holding up a glowing circular LED display." },
  { title: "Launch tests", image: "/builds/parachute.webp", alt: "A parachute and experimental flight hardware." },
  { title: "Demo day", image: "/builds/demo-day.webp", alt: "A builder presenting a project in front of a projected screen." },
  { title: "Built together", image: "/builds/built-together.webp", alt: "Builders working side by side at their laptops." },
  { title: "Hardware prototypes", image: "/builds/flight.webp", alt: "Exposed wiring on an experimental payload." },
  { title: "Deli", image: "/builds/deli.webp", alt: "A builder giving a talk on stage." },
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
