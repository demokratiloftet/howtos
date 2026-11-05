import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllHowtos, getHowto, getSection, SITE_NAME } from "@/lib/howtos";

type Params = PageProps<"/[section]/[slug]">["params"];

export function generateStaticParams() {
  return getAllHowtos().map(({ section, slug }) => ({ section, slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await params;
  const howto = getHowto(section, slug);
  return howto
    ? { title: `${howto.title} | ${SITE_NAME}`, description: howto.excerpt || undefined }
    : { title: "Fant ikke siden" };
}

// The URL-independent parts stay in the shared App Shell; only the
// howto itself depends on params, so it is read inside <Suspense>.
export default function HowtoPage({ params }: PageProps<"/[section]/[slug]">) {
  return (
    <div className="mx-auto max-w-2xl">
      <Suspense fallback={<p className="text-muted">Laster …</p>}>
        <HowtoContent params={params} />
      </Suspense>
    </div>
  );
}

async function HowtoContent({ params }: { params: Params }) {
  const { section: sectionId, slug } = await params;
  const howto = getHowto(sectionId, slug);
  const section = getSection(sectionId);
  if (!howto || !section) notFound();

  return (
    <>
      <nav className="mb-10 text-sm">
        <Link href={`/#${section.id}`} className="text-muted hover:text-foreground hover:underline">
          {section.title}
        </Link>
      </nav>
      <article className="prose" dangerouslySetInnerHTML={{ __html: howto.contentHtml }} />
      <p className="mt-16 border-t border-line pt-6 text-sm">
        <Link href="/" className="text-link underline-offset-4 hover:underline">
          Tilbake til alle veiledninger
        </Link>
      </p>
    </>
  );
}
