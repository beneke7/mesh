import { Footer } from "../components/journal/Chrome";
import Cover from "../components/journal/Cover";
import Journal from "../components/journal/Journal";
import Builds from "../components/journal/Builds";
import { u } from "../lib/base";

const joinVariants = [
  ["misreg", "Misregistered print (hover lines it up)"],
  ["grain", "Grain-filled letters"],
  ["cut", "Raw cut-off"],
  ["blueprint", "Blueprint"],
  ["invert", "Hover invert"],
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
          {/* TEMP: Join button variants side by side for picking one. */}
          {joinVariants.map(([key, label], i) => <div key={key} className="join-variant">
            <p className="join-label">{i + 1}. {label}</p>
            <a href={u("/join")} className={"join-button join--" + key}><span className="join-word">Join</span>
              {key === "misreg" && <span className="join-ghost" aria-hidden="true">Join</span>}</a>
          </div>)}
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
