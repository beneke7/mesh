import { formatDate, posts, publishedArticle, storyPath } from "../../lib/journal";
import { u } from "../../lib/base";

export default function Journal({ full = false }: { full?: boolean }) {
  const entries = full ? posts : posts.filter(post => !post.slug.startsWith("call-for-builders")).slice(0, 6);
  const Heading = full ? "h1" : "h2";
  return <section id="journal" className="journal" aria-labelledby="journal-title">
    <div className="wrap">
      <Heading id="journal-title" className="section-title">{full ? "Blog" : "Latest posts"}</Heading>
      <div className="post-list">
        {entries.map(post => {
          const author = publishedArticle(post.slug)?.byline;
          return <article key={post.slug} id={post.slug} className="post-entry">
            <a href={storyPath(post)}>
              <h3>{post.displayTitle}</h3>
              <p className="post-meta"><time dateTime={post.date}>{formatDate(post.date, "long")}</time>{author && <> by {author}</>}</p>
            </a>
          </article>;
        })}
      </div>
      {!full && <a className="more-link" href={u("/blog")}>More posts</a>}
    </div>
  </section>;
}
