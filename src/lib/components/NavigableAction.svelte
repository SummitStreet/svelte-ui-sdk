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
   * The NavigableAction module is a Svelte-specific component that renders either
   * a clickable button or link.
   */

  import type { NavigableActionDescriptor } from "./NavigableAction.utils.ts";

  /**
   * The properties recognized by the NavigableAction component.
   */
  export interface NavigableActionProperties extends NavigableActionDescriptor {
    className?: string;
    visible?: boolean;
    children?: Snippet<[]>;
  }

  export const defaultClassName = "navigable-action";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  const { id, className = defaultClassName, label, title, href, target, icon, visible, clickEventHandler, children }: NavigableActionProperties = $props();
</script>

{#snippet content()}
  {#if children}
    {@render children()}
  {:else if icon}
    {@render icon()}
  {:else}
    {label}
  {/if}
{/snippet}

{#if href}
  <a {id} {href} {target} class={className} aria-label={label} {title} class:visible rel={target === "_blank" ? "noopener noreferrer" : undefined}>
    {@render content()}
  </a>
{:else}
  <button type="button" {id} class={className} aria-label={label} {title} class:visible onclick={clickEventHandler}>
    {@render content()}
  </button>
{/if}
