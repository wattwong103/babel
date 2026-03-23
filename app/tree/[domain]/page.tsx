import TreePageClient from "./TreePageClient";

// Required for static export — pre-generate both domain pages
export function generateStaticParams() {
  return [{ domain: "sciences" }, { domain: "humanities" }];
}

export default function TreePage() {
  return <TreePageClient />;
}
