export type SocialBrand = "discord" | "x" | "linkedin" | "instagram";

export default function SocialIcon({ brand }: { brand: SocialBrand }) {
  return <span className={"social-icon icon-" + brand} aria-hidden="true" />;
}
