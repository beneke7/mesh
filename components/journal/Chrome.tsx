import { space } from "../../lib/journal";
import SocialIcon from "./SocialIcon";
import { u } from "../../lib/base";

export function BackToJournal({slug}: {slug?: string}) {
  return <a className="back-link" href={u("/blog") + (slug ? "#" + slug : "")}><span aria-hidden="true">←</span> Blog</a>;
}
export function JournalTools() {
  return <nav className="page-nav" aria-label="Main navigation">
    <a className="small-brand" href={u("/")} aria-label="mesh. Home">mesh.</a>
    <div><a href={u("/about")}>about</a><a href={u("/blog")}>blog</a><a href={u("/join")}>join</a></div>
  </nav>;
}
export function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) return <footer className="simple-footer">© 2026 mesh.</footer>;
  return <footer className="footer" id="contact"><div className="footer-content wrap">
    <p>© 2026 mesh.</p>
    <a className="contact-link" href="mailto:contact@example.com">contact@example.com</a>
    <nav className="social-links" aria-label="Social links">
      <a href={space.discordUrl} aria-label="Discord"><SocialIcon brand="discord" /></a>
      <button type="button" disabled aria-label="X link coming soon" title="X link coming soon"><SocialIcon brand="x" /></button>
      <a href={space.linkedinUrl} aria-label="LinkedIn"><SocialIcon brand="linkedin" /></a>
      <button type="button" disabled aria-label="Instagram link coming soon" title="Instagram link coming soon"><SocialIcon brand="instagram" /></button>
    </nav>
  </div></footer>;
}
