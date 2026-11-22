import type { Metadata } from "next";

export const metadata: Metadata = { title: "The pilot" };

export default function PilotPage() {
  return (
    <div className="shell section-space prose-page">
      <h1>Join the GripLab pilot</h1>
      <p>The pilot interest form is being prepared.</p>
    </div>
  );
}
