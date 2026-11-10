import Journal from "../../components/journal/Journal";
import { Footer, JournalTools } from "../../components/journal/Chrome";
export const metadata = { title: "Blog" };
export default function Blog() {
  return <div className="subpage blog-page grain-surface">
    <div className="document">
      <JournalTools />
      <main><Journal full /></main>
    </div>
    <Footer minimal />
  </div>;
}
