import { notFound } from "next/navigation";
import { BackToJournal, JournalTools, Footer } from "../../../components/journal/Chrome";
import { formatDate, posts, publishedArticle } from "../../../lib/journal";
import { u } from "../../../lib/base";

type Route = {params: Promise<{slug: string}>};
const photographs = [
  {image: "bench-detail", alt: "A builder fitting a component by hand.", width: 1280, height: 720},
  {image: "hack-overhead", alt: "An overhead view of a team comparing their laptops and tools.", width: 1500, height: 1125},
  {image: "parts", alt: "Small electronics sorted in red and clear drawers.", width: 1312, height: 1750},
  {image: "cad-disc", alt: "A builder rotating a circular component in CAD.", width: 1280, height: 720},
];

export const generateStaticParams = () => posts.map(post => ({slug: post.slug}));

export async function generateMetadata({params}: Route) {
  const {slug} = await params;
  const post = posts.find(entry => entry.slug === slug);
  return {title: post?.displayTitle || "Journal"};
}

export default async function Story({params}: Route) {
  const {slug} = await params;
  const post = posts.find(entry => entry.slug === slug);
  if (!post) notFound();
  const article = publishedArticle(slug);

  return <main className={"reading" + (article ? "" : " grain-surface subpage")}><div className="reading-wrap">
    <JournalTools />
    <article className={article ? "reader" : "photo-story"}>
      <header className="story-heading">
        <h1>{post.displayTitle}</h1>
        <p className="folio"><time dateTime={post.date}>{formatDate(post.date, "long")}</time>
          {article?.byline && <> · {article.byline}</>}
        </p>
      </header>
      {article ? <div className="article-body" dangerouslySetInnerHTML={{__html:article.html}} />
        : <div className="photo-essay">{photographs.map((photo, i) => <figure key={photo.image}>
            <img src={u("/photos/" + photo.image + ".webp")} alt={photo.alt} width={photo.width} height={photo.height}
              loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          </figure>)}</div>}
    </article>
    <div className="reader-end"><BackToJournal slug={slug} /></div>
  </div><Footer minimal /></main>;
}
