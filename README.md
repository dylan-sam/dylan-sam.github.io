# dylan-sam.github.io

This repository contains Dylan Samuelian's bilingual academic website. Jekyll generates complete static HTML pages from shared layouts, structured data and the Markdown documents stored in `_sections`.

## Structure

- `_layouts`: shared page and legacy redirect layouts.
- `_includes`: shared navigation, footer and compatibility routing.
- `_data/routes.yml`: the single source of truth for French and English URLs.
- `_data/navigation.yml`: navigation order and dropdown contents.
- `_data/i18n.yml`: translated interface labels.
- `_data/profile.yml`: shared identity and affiliation metadata.
- `_data/social.yml`: footer and structured-profile links.
- `_sections/fr` and `_sections/en`: French and English content sources.
- `static`: stylesheets, Bootstrap, images and PDF documents.
- `sitemap.xml` and `sitemap.txt`: minimal XML and plain-text lists of canonical pages.
- `robots.txt` and `llms.txt`: crawler discovery and AI-readable site information.

The navigation, language switcher, alternate-language metadata and `llms.txt` are generated from the shared route registry. Home, Publications and Awards are sections of the main page; their navigation entries use anchors, while legacy standalone URLs redirect to the corresponding section. The two deliberately minimal sitemaps contain only canonical pages, with no template processing or redirect URLs.

## Adding a page

1. Add the page key and localized URLs to `_data/routes.yml`.
2. Add that key to `_data/navigation.yml` if the page should appear in the ribbon.
3. Create one `index.html` page per language in directories matching the registered URLs. Set `nav_key` to the shared route key and `lang` to `fr` or `en`.
4. Add localized Markdown documents to `_sections/fr` and `_sections/en`, then list their `section_key` values in each page's `sections` front matter.
5. Add new shared interface labels to both language blocks in `_data/i18n.yml`.
6. Add each new canonical page URL to both `sitemap.xml` and `sitemap.txt`.

No layout or language-switching changes are needed for an ordinary new page.

## Local preview

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

The preview is then available at `http://localhost:4000/`.

## GitHub Pages deployment

In the repository settings, configure **Pages → Build and deployment** to deploy from the `main` branch and the repository root. GitHub Pages will run the supported Jekyll build automatically after each push.
