<script module lang="ts">
  /**
   * @license
   * The MIT License (MIT)
   *
   * Copyright (c) 2025 David Padgett/Summit Street Technologies.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   * @file
   * The Section module is a Svelte-specific component that renders one or more
   * HTML section elements, each containing a title, description, and child
   * Section components.
   */

  /**
   * The class names applied to section elements and their container divs are
   * derived from each section's position within the hierarchy rather than from
   * a fixed depth level.  Given a root className of "section", the first
   * top-level section receives class "section-0", its first child receives
   * "section-0-0", and so on.  Container divs follow the same path with a
   * "-contents" suffix: "section-0-contents", "section-0-0-contents", etc.
   *
   * This scheme gives every element a unique, targetable class name.  CSS
   * attribute selectors can be used to style groups of related sections:
   *
   *   [class^="section-0"]   - all elements under the 1st top-level section
   *   [class^="section-0-1"] - all elements under its second child
   *   [class$="-contents"]   - all container divs at any depth
   *
   * Because class names encode position rather than identity, they will change
   * if sections are reordered in the source data.  Use the id attribute for
   * CSS rules that must remain stable across reordering.
   */
  import { type SectionDescriptor } from "./Section.utils.ts";

  /**
   * The properties recognized by the Section component.
   */
  export interface SectionProperties {
    context: SectionDescriptor;
    className?: string;
  }

  export const defaultClassName = "section";
</script>

<script lang="ts">
  let { context, className = defaultClassName }: SectionProperties = $props();
</script>

{#snippet renderSection(sectionDescriptor: SectionDescriptor, className: string, index: number)}
  {@const title = sectionDescriptor.title}
  {@const description = sectionDescriptor.description}
  {@const sectionClassName = `${className}-${index}`}

  <section id={sectionDescriptor.id} class={sectionClassName}>
    {#if typeof title === "string"}
      <h2>{title}</h2>
    {:else if title}
      <h2>{@render title()}</h2>
    {/if}

    {#if typeof description === "string"}
      <p>{description}</p>
    {:else if description}
      {@render description()}
    {/if}

    <div class={`${sectionClassName}-contents`}>
      {#each sectionDescriptor.sections ?? [] as section, index (section.id)}
        {@render renderSection(section, sectionClassName, index)}
      {/each}
    </div>
  </section>
{/snippet}

{#each context.sections ?? [] as section, index (section.id)}
  {@render renderSection(section, className, index)}
{/each}
