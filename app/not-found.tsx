import { Footer, JournalTools } from "../components/journal/Chrome";
import { u } from "../lib/base";
export default function NotFound() {
  return <div className="subpage grain-surface"><div className="document"><JournalTools />
    <main className="document-content"><h1>Page out of print.</h1><a href={u("/blog")}>Back to the blog</a></main>
  </div><Footer minimal /></div>;
}
