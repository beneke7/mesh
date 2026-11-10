"use client";
import { useEffect, useRef, useState } from "react";
import SocialIcon from "./SocialIcon";
import { u } from "../../lib/base";

export default function Cover() {
  const film = useRef<HTMLVideoElement>(null);
  const cover = useRef<HTMLElement>(null);
  const [wantsMotion, setWantsMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const sync = () => setWantsMotion(document.documentElement.dataset.motion !== "off" && !preference.matches && !saveData);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const video = film.current;
    const section = cover.current;
    if (!video || !section || failed) return;
    let visible = section.getBoundingClientRect().bottom > 0;
    let disposed = false;
    const update = () => {
      if (!wantsMotion || !visible || document.hidden) { video.pause(); return; }
      video.muted = true; // React doesn't render the muted attribute, so autoplay policy blocks play() without this
      video.play().catch(() => { if (!disposed) setWantsMotion(false); });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(section);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { disposed = true; observer.disconnect(); document.removeEventListener("visibilitychange", update); video.pause(); };
  }, [wantsMotion, failed]);
  function toggleMotion() {
    const next = !wantsMotion;
    document.documentElement.dataset.motion = next ? "on" : "off";
    try { localStorage.setItem("mesh-motion", next ? "on" : "off"); } catch {}
    setWantsMotion(next);
  }
  return <section ref={cover} className="cover" aria-label="mesh. builderspace" data-ready={ready ? "yes" : "no"}>
    <div className="film-field">
      <picture className="film-poster">
        <source media="(max-aspect-ratio: 4/5)" srcSet={u("/film/poster-tall.webp")} />
        <img src={u("/film/poster-wide.webp")} alt="" width="1280" height="720" fetchPriority="high" />
      </picture>
      <video ref={film} className="film" muted playsInline loop preload="metadata" aria-hidden="true"
        disablePictureInPicture onPlaying={() => setReady(true)} onError={() => setFailed(true)}>
        <source media="(max-aspect-ratio: 4/5)" src={u("/film/mesh-color-tall-av1.mp4")} type={'video/mp4; codecs="av01.0.05M.08"'} />
        <source media="(max-aspect-ratio: 4/5)" src={u("/film/mesh-color-tall.mp4")} type="video/mp4" />
        <source src={u("/film/mesh-color-wide-av1.mp4")} type={'video/mp4; codecs="av01.0.05M.08"'} />
        <source src={u("/film/mesh-color-wide.mp4")} type="video/mp4" />
      </video>
    </div>
    <div className="hero-heading">
      <h1><img className="hero-logo" src={u("/mesh-logo-white.svg")} alt="mesh." width="810" height="310" /></h1>
      <nav className="hero-nav" aria-label="Main navigation">
        <a href={u("/about")}>about</a><a href={u("/blog")}>blog</a><a href={u("/join")}>join</a>
        <a className="hero-discord" href="https://discord.gg/CVA4z3QYzE" aria-label="Discord"><SocialIcon brand="discord" /></a>
      </nav>
    </div>
    <a className="hero-down" href="#intro" aria-label="Scroll down">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5 12 16.5 20 8.5" /></svg>
    </a>
    {!failed && <button type="button" className="motion-control" aria-label={wantsMotion ? "Pause montage" : "Play montage"} onClick={toggleMotion}>
      <svg aria-hidden="true" viewBox="0 0 18 18">{wantsMotion ? <path d="M5 3.5h2.2v11H5zm5.8 0H13v11h-2.2z" /> : <path d="m5.5 3 9.3 6-9.3 6z" />}</svg>
    </button>}
  </section>;
}
