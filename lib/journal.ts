import archive from "../content/journal.json";
import articles from "../content/articles.json";
import { u, withBase } from "./base";

export const posts = archive.posts;
export const space = archive.site;
export type Post = (typeof posts)[number];
type PublishedArticle = {title: string; byline: string | null; html: string};
const published: Record<string, PublishedArticle> = articles;
export function publishedArticle(slug: string): PublishedArticle | undefined {
  const article = published[slug];
  return article && {...article, html: withBase(article.html)};
}

export function formatDate(date: string, month: "short" | "long" = "short", includeYear = true) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month, year: includeYear ? "numeric" : undefined, timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}

export const storyPath = (post: Post) => u("/posts/" + post.slug);
