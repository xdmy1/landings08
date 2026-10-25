import { notFound } from "next/navigation";
import Demo from "./demo";

/* local preview only: loads a sample report into this browser and opens it */
export default function DemoPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Demo />;
}
