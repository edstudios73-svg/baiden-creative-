import { PageHeader } from "./ui";

/** Shared layout for privacy and terms. */
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: title, path }]} title={title} lead={<p className="text-label">Last updated {updated}</p>} />
      <div className="container-x pt-12 pb-20 md:pt-16">
        <div className="max-w-3xl space-y-10 text-lg leading-relaxed [&_h2]:text-heading [&_h2]:mb-4 [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_p]:text-graphite [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:text-graphite">
          {children}
        </div>
      </div>
    </>
  );
}
