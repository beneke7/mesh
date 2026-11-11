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
        <Journal />
        <Builds />
        <section className="community" aria-label="Join mesh."><div className="wrap">
          <p>mesh. is the builder community for people turning hardware, software, and ML ideas into real projects: local chapters, builder events, and an online home on Discord. We do builder-led incubation by giving builders space, resources, time, and a community that helps them ship.</p>
          <a href={u("/about")} className="more-link">About</a>
          <a href={u("/join")} className="join-button"><span className="join-word">Join</span>
            {[1, 2, 3, 4, 5, 6, 7].map(i => <span key={i} className="join-echo" aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>Join</span>)}
          </a>
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
