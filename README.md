# Howtos

This repository contains texts to guide people on how to do common tasks. The howtos will for now be in Norwegian, and will be available on TODO.

## Adding a howto

1. Add a Markdown file to a folder under `content/`, e.g. `content/bruker/min-howto.md`.
2. Start the file with a `# Heading` – it is used as the title on the site.
3. Link to other howtos with relative links, e.g. `[bruke domene](brukedomene.md)` or `[...](../admin/brukedomene.md)`.
4. Open a pull request. Once merged, the site is rebuilt.

Each folder is a category on the front page, and each file gets its own page at `/<folder>/<file-name>`.
The first paragraph after the heading is used as a short description in lists and search.

### Adding a category

Create a new folder under `content/`. To give it a nicer name and position on the front page, add it to `SECTIONS` in `src/lib/howtos.ts`.
Otherwise the folder name is used as the title. Files and folders starting with `_` are not shown as howtos.

## Running locally

```
pnpm install
pnpm dev
```

Then open http://localhost:3000.

# License

These howtos are licensed under CC-BY 4.0.
