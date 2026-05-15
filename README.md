# @summitstreet/svelte-ui-sdk

A set of composable, data-driven Svelte 5 UI components for building modern web applications.

## Contents

- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
  - [ItemRotator](#itemrotator)
  - [NavigableAction](#navigableaction)
  - [NavigationBar](#navigationbar)
  - [ProfileCard](#profilecard)
  - [Section](#section)
- [Utilities](#utilities)
- [Styling](#styling)
- [Development](#development)
- [License](#license)

---

## Components

| Component         | Description                                                                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ItemRotator`     | Cycles through an array of text strings or Svelte snippets, rendering the current item in a configurable HTML element with a fade transition between items.            |
| `NavigableAction` | Renders a `<button>` or `<a>` depending on whether an `href` is provided. Supports icon snippets and a `visible` CSS modifier.                                        |
| `NavigationBar`   | Renders a `<nav>` element containing a title and a row of `NavigableAction` links driven by a context object.                                                         |
| `ProfileCard`     | Renders a profile panel with an image, name, social/contact links, and a text or snippet description.                                                                 |
| `Section`         | Recursively renders a hierarchy of `<section>` elements from a `SectionDescriptor` data tree. Encodes each element's position in the hierarchy as its CSS class name. |

---

## Installation

The package is published to [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry). Installing it requires a GitHub personal access token with the `read:packages` scope.

**1. Configure the registry scope.**

Add the following to your project's `.npmrc`:

```
@summitstreet:registry=https://npm.pkg.github.com
```

**2. Authenticate.**

Either set the `NODE_AUTH_TOKEN` environment variable, or add an auth line to your `.npmrc`:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Do not commit a token to source control. Use an environment variable or a secrets manager.

**3. Install the package.**

```bash
npm install @summitstreet/svelte-ui-sdk
```

**Peer dependency:** `svelte >= 5.0.0`

---

## Usage

All components and types are exported from the package root:

```ts
import { ItemRotator, NavigableAction, NavigationBar, ProfileCard, Section } from "@summitstreet/svelte-ui-sdk";
import type {
  ItemRotatorProperties,
  NavigableActionDescriptor,
  NavigationBarContext,
  ProfileCardContext,
  SectionDescriptor,
} from "@summitstreet/svelte-ui-sdk";
```

### ItemRotator

Cycles through an array of text strings or Svelte snippets, rendering the current item inside a configurable HTML element. A `hidden` CSS class is applied during the transition between items, enabling a fade effect via CSS. Announces changes to screen readers via `aria-live="polite"`.

```svelte
<script lang="ts">
  import { ItemRotator } from "@summitstreet/svelte-ui-sdk";

  const outcomes = ["We build great software.", "We move fast.", "We ship quality."];
</script>

<!-- Rotate text strings in a span (default) -->
<ItemRotator items={outcomes} />

<!-- Rotate inside a div with a custom class and timing -->
<ItemRotator items={outcomes} elementType="div" className="hero-rotator" interval={3000} transition={500} />

<!-- Rotate Svelte snippets -->
{#snippet slideA()}<strong>Bold statement.</strong>{/snippet}
{#snippet slideB()}<em>Subtle point.</em>{/snippet}
<ItemRotator items={[slideA, slideB]} elementType="p" />
```

**Props**

| Prop          | Type                                    | Default          | Description                                                              |
| ------------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `items`       | `(string \| Snippet<[]>)[]`             | required         | Items to rotate through. Strings render as text; snippets render as HTML.|
| `elementType` | `"span" \| "div" \| "p" \| "section"`  | `"span"`         | HTML element rendered as the container.                                  |
| `id`          | `string`                                | —                | HTML `id` attribute.                                                     |
| `className`   | `string`                                | `"item-rotator"` | CSS class applied to the container element.                              |
| `interval`    | `number`                                | `2500`           | Milliseconds between item rotations.                                     |
| `transition`  | `number`                                | `400`            | Milliseconds the `hidden` class is held before the next item is shown.   |

**Exported constants**

| Constant            | Value            | Description                               |
| ------------------- | ---------------- | ----------------------------------------- |
| `defaultClassName`  | `"item-rotator"` | Default CSS class applied to the element. |
| `defaultInterval`   | `2500`           | Default rotation interval in ms.          |
| `defaultTransition` | `400`            | Default transition duration in ms.        |

> **Note:** When `items` contains zero or one item the rotation interval is not started and the `hidden` class is never applied.

---

### NavigableAction

Renders a `<button>` when no `href` is provided, or an `<a>` when one is. The `class:visible` modifier can be used to show or hide the element via CSS (useful for floating buttons that appear on scroll).

**Content priority:** `children` snippet → `icon` snippet → `label` text.

```svelte
<script lang="ts">
  import { NavigableAction } from "@summitstreet/svelte-ui-sdk";
</script>

<!-- Button -->
<NavigableAction id="save" label="Save" title="Save changes" clickEventHandler={() => save()} />

<!-- Link -->
<NavigableAction id="docs" label="Docs" title="Documentation" href="https://example.com" target="_blank" />

<!-- Icon button -->
{#snippet icon()}
  <svg><!-- ... --></svg>
{/snippet}
<NavigableAction id="icon-btn" label="Settings" title="Open settings" {icon} clickEventHandler={() => openSettings()} />

<!-- Conditionally visible (e.g. a back-to-top button) -->
<NavigableAction id="top" label="↑" title="Back to top" visible={scrolled} clickEventHandler={() => scrollTo(0)} />
```

**Props**

| Prop                | Type                          | Default              | Description                                                                      |
| ------------------- | ----------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| `id`                | `string`                      | —                    | HTML `id` attribute.                                                             |
| `className`         | `string`                      | `"navigable-action"` | CSS class applied to the element.                                                |
| `label`             | `string`                      | —                    | Visible text and `aria-label` fallback.                                          |
| `title`             | `string`                      | —                    | HTML `title` attribute (tooltip).                                                |
| `href`              | `string`                      | —                    | When set, renders an `<a>` instead of `<button>`.                                |
| `target`            | `string`                      | —                    | `<a>` target attribute. `_blank` automatically adds `rel="noopener noreferrer"`. |
| `icon`              | `Snippet<[]>`                 | —                    | Icon snippet rendered when no `children` are provided.                           |
| `visible`           | `boolean`                     | —                    | Adds or removes the `visible` CSS class.                                         |
| `clickEventHandler` | `(event: MouseEvent) => void` | —                    | Click handler (button only).                                                     |
| `children`          | `Snippet<[]>`                 | —                    | Custom content; takes priority over `icon` and `label`.                          |

---

### NavigationBar

Renders a `<nav>` element with a title and a row of link buttons driven by a `NavigationBarContext`.

```svelte
<script lang="ts">
  import { NavigationBar, type NavigationBarContext } from "@summitstreet/svelte-ui-sdk";

  const context: NavigationBarContext = {
    title: "My App",
    links: [
      { id: "nav-home", label: "Home", clickEventHandler: () => scrollTo("#home") },
      { id: "nav-about", label: "About", clickEventHandler: () => scrollTo("#about") },
      { id: "nav-contact", label: "Contact", clickEventHandler: () => scrollTo("#contact") },
    ],
  };
</script>

<NavigationBar id="main-nav" {context} />
```

Each link is rendered as a `NavigableAction` with the CSS class `{className}-button` (default: `navigation-bar-button`).

**Props**

| Prop        | Type                   | Default            | Description                                                                                                     |
| ----------- | ---------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `context`   | `NavigationBarContext` | required           | Title and link descriptors.                                                                                     |
| `id`        | `string`               | —                  | HTML `id` on the `<nav>` element.                                                                               |
| `className` | `string`               | `"navigation-bar"` | CSS class on the `<nav>` element. Also used to derive `{className}-links` and `{className}-button` class names. |
| `children`  | `Snippet`              | —                  | Optional extra content appended inside the `<nav>`.                                                             |

**`NavigationBarContext`**

| Field   | Type                          | Description                                              |
| ------- | ----------------------------- | -------------------------------------------------------- |
| `title` | `string`                      | Title text rendered in a `<span>`.                       |
| `links` | `NavigableActionDescriptor[]` | Link descriptors; see `NavigableActionDescriptor` below. |

---

### ProfileCard

Renders a profile panel composed of an image, name, social/contact links, and a description. The description accepts either a plain string or a Svelte snippet.

```svelte
<script lang="ts">
  import { ProfileCard, type ProfileCardContext } from "@summitstreet/svelte-ui-sdk";

  const context: ProfileCardContext = {
    name: "Jane Smith",
    imageUrl: "/images/jane.jpg",
    description: "Software engineer with 10 years of experience.",
    links: [
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/jane", target: "_blank" },
      { id: "email", label: "Email", clickEventHandler: () => composeEmail("jane@example.com") },
    ],
  };
</script>

<ProfileCard id="about-profile" {context} />
```

**Props**

| Prop        | Type                 | Default          | Description                                                                                                                                     |
| ----------- | -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`   | `ProfileCardContext` | required         | Profile data.                                                                                                                                   |
| `id`        | `string`             | —                | HTML `id` on the root `<div>`.                                                                                                                  |
| `className` | `string`             | `"profile-card"` | CSS class on the root `<div>`. Also used to derive `{className}-title`, `{className}-name`, `{className}-links`, and `{className}-description`. |
| `children`  | `Snippet<[]>`        | —                | Optional extra content appended after the description.                                                                                          |

**`ProfileCardContext`**

| Field         | Type                          | Description                                             |
| ------------- | ----------------------------- | ------------------------------------------------------- |
| `name`        | `string`                      | Display name; also used as the `<img>` `alt` attribute. |
| `imageUrl`    | `string`                      | URL of the profile image.                               |
| `links`       | `NavigableActionDescriptor[]` | Contact or social links rendered below the name.        |
| `description` | `string \| Snippet<[]>`       | Biography text or a snippet for custom markup.          |

---

### Section

Recursively renders a `SectionDescriptor` tree as nested `<section>` elements. Each section receives a CSS class name derived from its position in the hierarchy.

```svelte
<script lang="ts">
  import { Section, type SectionDescriptor } from "@summitstreet/svelte-ui-sdk";

  const content: SectionDescriptor = {
    id: "root",
    sections: [
      {
        id: "services",
        title: "Services",
        description: "What we offer.",
        sections: [
          { id: "consulting", title: "Consulting", description: "Strategic technology guidance." },
          { id: "development", title: "Development", description: "Full-stack engineering." },
        ],
      },
    ],
  };
</script>

<Section context={content} />
```

**Generated markup**

```html
<section id="services" class="section-0">
  <h2>Services</h2>
  <p>What we offer.</p>
  <div class="section-0-contents">
    <section id="consulting" class="section-0-0">...</section>
    <section id="development" class="section-0-1">...</section>
  </div>
</section>
```

**Class naming scheme**

Class names encode each element's position in the hierarchy. Given a root `className` of `"section"` (the default):

| Element                       | Class                  |
| ----------------------------- | ---------------------- |
| 1st top-level section         | `section-0`            |
| 2nd top-level section         | `section-1`            |
| 1st child of `section-0`      | `section-0-0`          |
| 2nd child of `section-0`      | `section-0-1`          |
| Contents div of `section-0`   | `section-0-contents`   |
| Contents div of `section-0-0` | `section-0-0-contents` |

CSS attribute selectors can target groups of elements:

```css
/* All top-level sections (enumerate to avoid matching children) */
.section-0, .section-1, .section-2 { ... }

/* All contents divs at any depth */
[class$="-contents"] { ... }

/* All cards within a known set of top-level sections */
:is(.section-0-0, .section-0-1, .section-1-0, .section-1-1) { ... }
```

> **Note:** Class names reflect position, not identity. If sections are reordered in the source data, their class names change. Use `id` attributes for CSS rules that must remain stable across reordering.

**Props**

| Prop        | Type                | Default     | Description                                        |
| ----------- | ------------------- | ----------- | -------------------------------------------------- |
| `context`   | `SectionDescriptor` | required    | Root descriptor; its `sections` array is rendered. |
| `className` | `string`            | `"section"` | Prefix for all generated class names.              |

**`SectionDescriptor`**

| Field         | Type                      | Description                                           |
| ------------- | ------------------------- | ----------------------------------------------------- |
| `id`          | `string`                  | HTML `id` on the `<section>` element.                 |
| `label`       | `string`                  | Optional short label (e.g. for navigation links).     |
| `title`       | `string \| Snippet<[]>`   | Rendered as `<h2>`.                                   |
| `description` | `string \| Snippet<[]>`   | Rendered as `<p>` (string) or inline (snippet).       |
| `properties`  | `Record<string, unknown>` | Arbitrary application-defined metadata. Not rendered. |
| `sections`    | `SectionDescriptor[]`     | Child sections rendered recursively.                  |

---

## Utilities

```ts
import { getSectionDescriptorById, getSectionDescriptorIndices } from "@summitstreet/svelte-ui-sdk";
```

### `getSectionDescriptorById`

Traverses a `SectionDescriptor` tree and returns the node at the given ID path.

```ts
const root: SectionDescriptor = {
  id: "root",
  sections: [{ id: "about", sections: [{ id: "profile", title: "Profile" }] }],
};

getSectionDescriptorById(root, []); // returns root
getSectionDescriptorById(root, ["about"]); // returns the "about" node
getSectionDescriptorById(root, ["about", "profile"]); // returns the "profile" node
getSectionDescriptorById(root, ["missing"]); // returns undefined
```

### `getSectionDescriptorIndices`

Returns the numeric index path of the node with the given ID path, or `undefined` if any ID is not found. Useful for deriving the CSS class name of a section without rendering it.

```ts
getSectionDescriptorIndices(root, ["about"]); // [0]
getSectionDescriptorIndices(root, ["about", "profile"]); // [0, 0]
getSectionDescriptorIndices(root, ["missing"]); // undefined
```

### `NavigableActionDescriptor`

The shared link descriptor type used by `NavigationBarContext` and `ProfileCardContext`.

| Field               | Type                          | Description                        |
| ------------------- | ----------------------------- | ---------------------------------- |
| `id`                | `string`                      | HTML `id` on the rendered element. |
| `title`             | `string`                      | Tooltip text.                      |
| `label`             | `string`                      | Visible text and `aria-label`.     |
| `icon`              | `Snippet<[]>`                 | Icon snippet.                      |
| `href`              | `string`                      | When set, renders an `<a>`.        |
| `target`            | `string`                      | `<a>` target attribute.            |
| `clickEventHandler` | `(event: MouseEvent) => void` | Click handler (button only).       |

---

## Styling

The package ships no global styles. Each component applies CSS class names to its elements; consumers provide the rules.

A reference stylesheet is included at `src/app.css` in the source tree. It documents the class names produced by each component and provides a baseline implementation suitable for copying and adapting:

```
ItemRotator      →  .item-rotator, .item-rotator.hidden
NavigableAction  →  .navigable-action, .navigable-action.visible
NavigationBar    →  .navigation-bar, .navigation-bar span, .navigation-bar-links, .navigation-bar-button
ProfileCard      →  .profile-card, .profile-card-title, .profile-card-name, .profile-card-links, .profile-card-description
Section          →  [class^="section-"], [class$="-contents"], .section-0, .section-0-0, ...
```

---

## Development

**Prerequisites:** Node 24, npm 10+

```bash
# Install dependencies
npm install

# Start the demo app
npm run dev

# Type-check
npm run check

# Run all tests
npm test

# Run tests with coverage
npm run coverage

# Lint
npm run lint

# Format
npm run format

# Build the library
npm run build
```

**Releasing**

The `prepublishOnly` script runs the full build and test suite automatically before any publish. Use the release scripts to bump the version and publish in one step:

```bash
npm run release:patch   # 1.0.0 → 1.0.1
npm run release:minor   # 1.0.0 → 1.1.0
npm run release:major   # 1.0.0 → 2.0.0
```

---

## License

MIT © 2025 David Padgett / Summit Street Technologies. See [LICENSE](LICENSE).
