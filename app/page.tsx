import { Footer } from "../components/journal/Chrome";
import Cover from "../components/journal/Cover";
import Journal from "../components/journal/Journal";
import Builds from "../components/journal/Builds";
import { u } from "../lib/base";

const ghostOffsets = [
  ["Down-right (current)", ".07em", ".045em"],
  ["Up-left", "-.07em", "-.045em"],
  ["Up-right", ".07em", "-.045em"],
  ["Down-left", "-.07em", ".045em"],
  ["Straight left", "-.08em", "0"],
  ["Straight up", "0", "-.06em"],
];

export default function Home() {
  return <>
    <a className="jump-link" href="#journal">Skip to latest posts</a>
    <main id="main">
      <Cover />
      <div className="home-content grain-surface">
        <Journal />
        <Builds />
        <section className="community" aria-label="Join mesh."><div className="wrap">
          <p>mesh. is the builder community for people turning hardware, software, and ML ideas into real projects: local chapters, builder events, and an online home on Discord. We do builder-led incubation by giving builders space, resources, time, and a community that helps them ship.</p>
          <a href={u("/about")} className="more-link">About</a>
          {/* TEMP: ghost offset directions for picking one. */}
          {ghostOffsets.map(([label, gx, gy], i) => <div key={label} className="join-variant">
            <p className="join-label">{i + 1}. {label}</p>
            <a href={u("/join")} className="join-button" style={{ "--gx": gx, "--gy": gy } as React.CSSProperties}><span className="join-word">Join</span>
              <span className="join-ghost" aria-hidden="true">Join</span></a>
          </div>)}
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
