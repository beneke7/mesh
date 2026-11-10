import { Footer } from "../components/journal/Chrome";
import Cover from "../components/journal/Cover";
import Journal from "../components/journal/Journal";
import Builds from "../components/journal/Builds";
import { u } from "../lib/base";

const tagline = "We’re a builder space in Budapest where we seek and develop\u00a0talent.";

export default function Home() {
  return <>
    <a className="jump-link" href="#journal">Skip to latest posts</a>
    <main id="main">
      <Cover />
      <div className="home-content grain-surface">
        <section id="intro" className="intro" aria-label="What mesh. does">
          <p className="tagline wrap" data-text={tagline}>{tagline}</p>
        </section>
        <Journal />
        <Builds />
        <section className="community" aria-label="Join mesh."><div className="wrap">
          <p>mesh. is the builder community for people turning hardware, software, and ML ideas into real projects: local chapters, builder events, and an online home on Discord. We do builder-led incubation by giving builders space, resources, time, and a community that helps them ship.</p>
          <a href={u("/about")} className="more-link">About</a>
          <a href={u("/join")} className="join-button">Join</a>
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
