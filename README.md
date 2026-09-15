# Basic Website Template

A neutral website template with a fresh green and white palette, pure black text, and a four-square green favicon. Built with HTML, CSS, and JavaScript, with no dependencies or build step.

## Navigation

- One-row menu: Section Home, Section A, Section B, Section C, Section D.
- Section A includes Subsection A 1 through Subsection A 4.
- Section Home includes About; Sections B, C, and D contain neutral text prompts.
- Footer links open placeholder pages for Privacy Policy, Terms of Use, Cookie Policy, and Contact.
- On narrow screens the main menu scrolls horizontally if needed.
- Active sections use a green background and underline; the current subsection is also marked.
- All content pages share a title, introduction, main heading, paragraphs, and an optional image.
- Section Home includes a neutral image placeholder; Section B demonstrates a subheading, list, quotation, and text link.
- Keyboard users have visible focus indicators and a Skip to content link that stays on the current section.
- The footer year updates automatically.
- Invalid hash routes show Page not found; 404.html handles missing file paths on GitHub Pages.
- Open Graph and X metadata provide a site-wide social preview.

## Customise

Edit SITE_NAME and sections in app.js. Update matching menu labels in index.html. Change the colour and font tokens in styles.css. Replace favicon.svg and favicon.ico and apple-touch-icon.png to change the tab and iPhone home-screen icons. All page links use hash routes, so refreshing and browser Back/Forward work on static hosting.

Each content page supports `title`, `description`, `heading`, `paragraphs`, and an optional `image` object with `src`, `alt`, and `caption`. Copy the image object from Section Home to add an image to another section or subsection, or remove it for a text-only page. Set the image width and height in the render function to match your replacement asset. Section B's `showTextExamples` flag enables the sample text elements.

Replace "Your Name or Organization" in index.html and 404.html. Keep the footer pages as placeholders until you supply your own text.

Before publishing under a different repository or domain, update the canonical and social URLs, title, description, and image alt text in index.html; replace og.png with your own 1200 × 630 preview; and update both Home links and the favicon path in 404.html. Hash routes share one social card because link-preview crawlers receive the same HTML for every section. Messaging apps may cache an older preview for a while.

## GitHub Pages

In Settings > Pages, choose Deploy from a branch, select main and / (root), and save. No build tools or installations are needed.

## Run locally

Open index.html directly or serve the repository with any static web server.
