import type { Metadata } from "next";
import { NotFoundView } from "./blog/chrome";

export const metadata: Metadata = {
  title: "404 | landings.md",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
