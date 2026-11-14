import type { ReactNode } from "react";
import { Footer } from "./Chrome";
import Cover from "./Cover";
import Journal from "./Journal";
import Builds from "./Builds";
import { u } from "../../lib/base";

export const statement = <section className="community" aria-label="About mesh."><div className="wrap">
  <p>mesh. is the builder community for people turning hardware, software, and ML ideas into real projects: local chapters, builder events, and an online home on Discord. We do builder-led incubation by giving builders space, resources, time, and a community that helps them ship.</p>
  <a href={u("/about")} className="more-link">About</a>
</div></section>;

// The home page with a swappable intro slot (the statement today; value drafts under /drafts).
export default function HomeShell({ intro, builds = <Builds />, cover = <Cover /> }: { intro: ReactNode; builds?: ReactNode; cover?: ReactNode }) {
  return <>
    <a className="jump-link" href="#journal">Skip to latest posts</a>
    <main id="main">
      {cover}
      <div className="home-content grain-surface">
        {intro}
        <Journal />
        {builds}
        <section className="community join-cta" aria-label="Join mesh."><div className="wrap">
          <a href={u("/join")} className="join-button"><span className="join-word">Join</span>
            <span className="join-ghost" aria-hidden="true">Join</span></a>
        </div></section>
        <Footer />
      </div>
    </main>
  </>;
}
