import type { Metadata } from "next";
import "./globals.css";
import { u } from "../lib/base";

export const metadata: Metadata = {
  title: { default: "mesh. — Budapest builderspace", template: "%s — mesh." },
  description: "The journal of a Budapest builderspace.",
  icons: { icon: u("/favicon.svg") },
};

const motionPreference = `(function () {
  try { document.documentElement.dataset.motion = localStorage.getItem('mesh-motion') === 'off' ? 'off' : 'on'; }
  catch (_) { document.documentElement.dataset.motion = 'on'; }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head>
    <meta name="theme-color" content="#18191b" />
    <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: motionPreference }} />
  </head><body>{children}</body></html>;
}
