import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "The story behind VivahaLink — premium Tamil wedding invitation websites, ordered simply over WhatsApp and delivered as a shareable link.",
};

export default function AboutPage() {
  return <AboutContent />;
}
