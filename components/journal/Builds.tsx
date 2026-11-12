"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { u } from "../../lib/base";

type Build = { title: string; tag?: string; logo?: boolean; image?: string; alt?: string; text?: string; href?: string; prio?: number };

// The middle 3x3 of the 5x3 sheet, in reading order. Anything listed here that has no tile yet is skipped.
const center = ["Resoloon", "meshapplied", "plora", "Truestance", "Aerial firefighting", "Holorat", "vor.tech", "Gaemlabs", "Viewrium"];

// Everything else fills the remaining slots, shuffled on each visit; higher `prio` (default 1) lands in view more often.
// Tiles without an image show their description on a plain dark tile.
const builds: Build[] = [
  { title: "Resoloon", tag: "Funded startup", image: "/builds/balloon.webp", alt: "Two builders launching the Resoloon weather balloon in a field.", text: "Earth observation intelligence for every industry.", href: "https://resoloon.com" },
  { title: "meshapplied", image: "/builds/meshapplied.webp", alt: "The meshapplied logo.", logo: true, text: "Task-specialized open models for your inference needs.", href: "https://meshapplied.com" },
  { title: "plora", tag: "Funded startup", image: "/builds/plora.webp", alt: "A plora robot arm on a test rig while a builder steers it with a VR headset.", text: "Automation for complex assembly and disassembly problems.", href: "https://plora.ai" },
  { title: "Truestance", image: "/builds/truestance.webp", alt: "A Truestance skeleton with posture landmarks along the spine and joints.", text: "Posture scans for movement instructions.", href: "https://truestance.tech" },
  { title: "Aerial firefighting", image: "/builds/firefighting.webp", alt: "A firefighting helicopter in silhouette trailing water.", text: "Optimizing aerial firefighting with state-of-the-art CFD." },
  { title: "Holorat", image: "/builds/holorat.webp", alt: "A builder crouching next to the Holorat build.", text: "A hologram pet rat." },
  { title: "vor.tech", image: "/builds/vortech.webp", alt: "A first-person Counter-Strike gameplay frame from the vor.tech dataset.", text: "Open multiplayer gameplay data for world models.", href: "https://vor.tech" },
  { title: "Gaemlabs", image: "/builds/gaemlabs.webp", alt: "Two builders testing virtual reality headsets.", text: "Multiplayer XR games in the Meta XR ecosystem.", href: "https://gaemlabs.com" },
  { title: "Viewrium", image: "/builds/viewrium.webp", alt: "A builder presenting Viewrium in front of a projected screen.", text: "Furniture and home decor as 3D and AR experiences.", href: "https://www.viewrium.com" },
  { title: "Tonekeep", image: "/builds/tonekeep.webp", alt: "Close-up of a vintage Fender guitar amp control panel.", text: "Parametrizable neural amp models." },
  { title: "Bad Company", image: "/builds/badco.webp", alt: "The Bad Company team working side by side at their laptops.", text: "Sub-20ms deterministic AI execution, confidential compute, kernel-bypass defense.", href: "https://github.com/BadC-mpany/lilith-zero" },
  { title: "llocus", image: "/builds/llocus.webp", alt: "A kestrel perched on a rooftop against a blue sky.", text: "Models that run faster on less energy, at the same quality.", href: "https://llocus.cc" },
  { title: "CP-80", image: "/builds/cp80.webp", alt: "A Yamaha CP-80 electric grand piano opened up to show its frame and strings.", text: "A digitally playable electric grand piano." },
  { title: "CanSat", image: "/builds/parachute.webp", alt: "A parachute and the CanSat flight hardware.", text: "A satellite inside your soda can.", href: "/posts/cansat-competition" },
  { title: "Smart chessboard", image: "/builds/led-chessboard.webp", alt: "A builder playing on an LED chessboard linked to a projected board.", text: "Physical chessboards, online games." },
  { title: "roomtreatment", image: "/builds/roomtreatment.webp", alt: "An acoustic simulation of a room, with treatment panels and a sound heatmap.", text: "Acoustic treatment for your room, done yourself.", href: "https://roomtreatment.diy" },
  { title: "Crowdpredictor", text: "AI-powered crowd prediction." },
  { title: "UPrep", text: "The anti-establishment cooking app." },
  { title: "A Clinic", image: "/builds/aclinic.svg", alt: "The A Clinic logo.", logo: true, text: "A telemedicine platform for weight loss.", href: "https://a.clinic" },
  { title: "The method of moving points", image: "/builds/mmp.webp", alt: "A geometry construction of lines and a circle through labelled points.", text: "Teaching olympiad geometry." },
  { title: "Acoustic thermometry", image: "/builds/thermometer.webp", alt: "An ultrasonic thermometer prototype.", text: "Measuring temperature at a point remotely, with sound.", href: "/posts/addressing-the-challenges-of-traditional-thermometers" },
  { title: "LED decor", image: "/builds/led-decor.webp", alt: "A builder holding up a glowing circular LED display.", text: "Hand-built LED displays and light pieces." },
];

const ROWS = 3;
const COLS = Math.max(5, Math.ceil(builds.length / ROWS));
const C0 = Math.floor((COLS - 3) / 2); // first column of the fixed 3x3 centre block
type Placed = { build: Build; row: number; col: number; center: boolean };

// Centre titles take the middle 3x3 in reading order. Everything else is weighted-shuffled
// (Efraimidis–Spirakis: sort by random^(1/prio)) and dealt into the remaining slots nearest the
// centre first, so higher prio tends to land in view. A constant `rand` gives a plain prio sort for SSR.
function arrange(rand: () => number): Placed[] {
  const fixed = center.map(t => builds.find(b => b.title === t)).filter((b): b is Build => !!b);
  const rest = builds.filter(b => !fixed.includes(b))
    .map(b => ({ b, k: rand() ** (1 / (b.prio ?? 1)) })).sort((x, y) => y.k - x.k).map(x => x.b);
  const placed: Placed[] = [];
  const middle = [...fixed, ...rest.splice(0, 9 - fixed.length)];
  middle.forEach((build, i) => placed.push({ build, row: Math.floor(i / 3), col: C0 + (i % 3), center: true }));
  const mid = C0 + 1;
  const free: { row: number; col: number }[] = [];
  for (let col = 0; col < COLS; col++) for (let row = 0; row < ROWS; row++)
    if (col < C0 || col > C0 + 2) free.push({ row, col });
  free.sort((x, y) => Math.abs(x.col - mid) - Math.abs(y.col - mid) || rand() - .5);
  rest.forEach((build, i) => placed.push({ build, ...free[i], center: false }));
  return placed;
}

if (process.env.NODE_ENV !== "production") {
  const a = arrange(Math.random);
  const cells = new Set(a.map(p => p.row * COLS + p.col));
  console.assert(a.length === builds.length && cells.size === a.length && a.every(p => p.col < COLS && p.row < ROWS), "arrange: lost, doubled or out-of-grid tile");
  console.assert(center.filter(t => builds.some(b => b.title === t)).every((t, i) => a[i].build.title === t && a[i].center), "arrange: centre not fixed");
}

export default function Builds() {
  const gallery = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const [active, setActive] = useState<string | null>(null);
  const [order, setOrder] = useState(() => arrange(() => .5));

  function updateEdges() {
    const element = gallery.current;
    if (!element) return;
    const end = element.scrollWidth - element.clientWidth;
    setEdges({ left: element.scrollLeft <= 1, right: element.scrollLeft >= end - 1 });
  }

  useEffect(() => setOrder(arrange(Math.random)), []);

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;
    // Start with the middle of the centre block in the middle of the viewport.
    const middle = element.querySelectorAll<HTMLElement>(".build-tile.is-center")[4];
    if (middle) {
      const tile = middle.getBoundingClientRect(), view = element.getBoundingClientRect();
      element.scrollLeft += tile.left + tile.width / 2 - (view.left + view.width / 2);
    }
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
    </div><div className="build-stage"><div className="build-window" id="build-gallery" ref={gallery} onScroll={updateEdges} tabIndex={0} role="region" aria-label="Build projects, scroll horizontally"><div className="build-grid" style={{ "--cols": COLS } as CSSProperties}>
      {order.map(({ build, row, col, center: isCenter }) => <figure style={{ gridRow: row + 1, gridColumn: col + 1 }} className={`build-tile${isCenter ? " is-center" : ""}${build.image ? "" : " no-image"}${build.logo ? " is-logo" : ""}${active === build.title ? " is-active" : ""}`} key={build.title} onClick={event => {
        // Touch has no hover: the first tap reveals the description, the second follows the link.
        if (!matchMedia("(hover:none)").matches) return;
        if (active !== build.title) event.preventDefault();
        setActive(active === build.title ? null : build.title);
      }}>
        {build.image && <img src={u(build.image)} alt={build.alt} width="600" height="600" loading="lazy" decoding="async" />}
        {build.tag && <span className="build-tag">{build.tag}</span>}
        <figcaption>{build.title}{build.text && <span className="build-text">{build.text}</span>}</figcaption>
        {build.href && <a className="build-link" href={build.href.startsWith("/") ? u(build.href) : build.href} aria-label={`More about ${build.title}`} {...(build.href.startsWith("http") && { target: "_blank", rel: "noopener" })}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </a>}
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
