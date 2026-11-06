import Link from "next/link";
import { getSections, SITE_NAME } from "@/lib/howtos";

export default function Home() {
  const sections = getSections();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-12 max-w-xl">
        <h1 className="sr-only">{SITE_NAME}</h1>
        <p className="font-serif text-2xl leading-snug sm:text-3xl">
          Korte, praktiske veiledninger for vanlige oppgaver i Atmosphere.
        </p>
      </header>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="grid gap-4 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8"
        >
          <h2 className="font-serif text-xl font-semibold sm:pt-0.5">{section.title}</h2>
          <ul className="space-y-6">
            {section.howtos.map((h) => (
              <li key={h.slug}>
                <Link href={`/${h.section}/${h.slug}`} className="group block">
                  <span className="text-lg font-medium text-link underline-offset-4 group-hover:underline">
                    {h.title}
                  </span>
                  {h.excerpt && <span className="mt-1 block text-muted">{h.excerpt}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
