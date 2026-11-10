import { Footer, JournalTools } from "../../components/journal/Chrome";
import pages from "../../content/pages.json";
import { withBase } from "../../lib/base";
export const metadata = { title: "About" };
export default function About() {
  return <div className="subpage grain-surface"><div className="document">
    <JournalTools />
    <main className="document-content"><h1>About</h1><div dangerouslySetInnerHTML={{ __html: withBase(pages.about.html) }} /></main>
  </div><Footer minimal /></div>;
}
