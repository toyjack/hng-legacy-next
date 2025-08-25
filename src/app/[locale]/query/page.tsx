import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function QueryIndexPage() {
  return <div>QueryIndexPage</div>;
}
export default QueryIndexPage;
