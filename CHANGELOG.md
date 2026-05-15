# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-05-14

### Added

#### Components

- **`ItemRotator`** — renders a sequence of text strings or Svelte snippets
  inside a `<span>`, `<div>`, `<p>`, or `<section>` element, cycling through
  them at a configurable interval with a configurable fade transition. Exports
  `defaultClassName`, `defaultInterval`, and `defaultTransition` constants.
  Includes `aria-live="polite"` for screen reader compatibility.

#### Types

- `ItemRotatorProperties` — Svelte component prop type for `ItemRotator`.

#### Tests

- Vitest browser test suite for `ItemRotator` covering element type rendering,
  id and class attribute behaviour, `aria-live` attribute, string and snippet
  content rendering, and rotation timing using fake timers.

---

## [1.0.0] - 2026-05-08

### Added

#### Components

- **`NavigableAction`** — renders a `<button>` or `<a>` depending on whether an
  `href` is provided. Supports icon snippets, a `visible` CSS modifier for
  scroll-triggered visibility, and an optional `children` snippet that takes
  priority over icon and label content.
- **`NavigationBar`** — renders a `<nav>` element containing a title `<span>`
  and a row of `NavigableAction` link buttons driven by a `NavigationBarContext`
  descriptor object.
- **`ProfileCard`** — renders a profile panel composed of a circular image,
  display name, a row of social/contact link buttons, and a description that
  accepts either a plain string or a Svelte snippet.
- **`Section`** — recursively renders a `SectionDescriptor` tree as nested
  `<section>` elements. Encodes each element's position in the hierarchy as its
  CSS class name using a position-path scheme (`section-0`, `section-0-0`,
  `section-0-contents`, etc.).

#### Utilities

- **`getSectionDescriptorById`** — traverses a `SectionDescriptor` tree by ID
  path and returns the matching node, or `undefined` if any ID in the path is
  not found.
- **`getSectionDescriptorIndices`** — returns the numeric index path of the node
  at a given ID path, useful for deriving CSS class names without rendering.

#### Types

- `NavigableActionDescriptor` — shared link descriptor used by
  `NavigationBarContext` and `ProfileCardContext`.
- `NavigableActionProperties`, `NavigationBarProperties`,
  `ProfileCardProperties`, `SectionProperties` — Svelte component prop types.
- `NavigationBarContext`, `ProfileCardContext`, `SectionDescriptor` — data
  context types consumed by their respective components.

#### Toolchain

- Build pipeline: `svelte-package` for Svelte component packaging,
  `tsc --project tsconfig.build.json` for TypeScript declaration map generation,
  `vite build` for the demo application.
- Pre-build and post-build scripts (`scripts/pre-build.ts`,
  `scripts/post-build.ts`).
- Type checking via `svelte-check`.
- ESLint configuration with TypeScript, Svelte, JSDoc, markdown, HTML, and
  import-sort rules.
- Prettier and stylelint formatting.
- Vitest test suite with Playwright browser tests for all four components and
  unit tests for `Section.utils`.
- GitHub Actions CI workflow (lint, type check, test on push and pull request).
- GitHub Actions publish workflow (build, test, publish to GitHub Packages on
  version tag push).
- `release:patch`, `release:minor`, `release:major` scripts using
  `npm version` and `git push --follow-tags`.

#### Reference stylesheet

- `src/app.css` — documents the CSS class names produced by each component and
  provides a baseline implementation suitable for copying and adapting.

[1.1.0]: https://github.com/SummitStreet/svelte-ui-sdk/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/SummitStreet/svelte-ui-sdk/releases/tag/v1.0.0
