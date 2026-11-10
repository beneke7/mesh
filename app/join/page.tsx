import { Footer, JournalTools } from "../../components/journal/Chrome";
import pages from "../../content/pages.json";
import { withBase } from "../../lib/base";
export const metadata = { title: "Join" };
export default function Join() {
  return <div className="subpage join-page grain-surface"><div className="document">
    <JournalTools />
    <main className="document-content"><h1>Join</h1><div dangerouslySetInnerHTML={{ __html: withBase(pages.join.html) }} /></main>
  </div><Footer minimal /></div>;
}
