import { Footer } from "../components/journal/Chrome";
import Cover from "../components/journal/Cover";
import Journal from "../components/journal/Journal";
import Builds from "../components/journal/Builds";
import { u } from "../lib/base";

export default function Home() {
  return <>
    <a className="jump-link" href="#journal">Skip to latest posts</a>
    <main id="main">
      <Cover />
      <div className="home-content grain-surface">
        <section className="community" aria-label="About mesh."><div className="wrap">
          <p>mesh. is the builder community for people turning hardware, software, and ML ideas into real projects: local chapters, builder events, and an online home on Discord. We do builder-led incubation by giving builders space, resources, time, and a community that helps them ship.</p>
          <a href={u("/about")} className="more-link">About</a>
        </div></section>
        <Journal />
        <Builds />
        <section className="community join-cta" aria-label="Join mesh."><div className="wrap">
          <a href={u("/join")} className="join-button"><span className="join-word">Join</span>
            <span className="join-ghost" aria-hidden="true">Join</span></a>
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
