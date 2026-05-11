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
   * The NavigationBar module is a Svelte-specific component that renders a set of
   * NavigableAction components.
   */

  import type { NavigableActionDescriptor } from "./NavigableAction.utils.ts";

  /**
   * Defines the context, or non-HTML specific state, of the NavigationBar
   * component.
   */
  export interface NavigationBarContext {
    title?: string;
    links: NavigableActionDescriptor[];
  }

  /**
   * The properties recognized by the NavigationBar component.
   */
  export interface NavigationBarProperties {
    context: NavigationBarContext;
    id?: string;
    className?: string;
    children?: Snippet;
  }

  export const defaultClassName = "navigation-bar";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  import NavigableAction from "./NavigableAction.svelte";

  let { context, id, className = defaultClassName, children }: NavigationBarProperties = $props();
</script>

<nav {id} class={className}>
  <span>{context.title}</span>
  <div class={`${className}-links`}>
    {#each context.links as link (link.id)}
      <NavigableAction id={link.id} className={`${className}-button`} title={link.title} label={link.label} icon={link.icon} href={link.href} target={link.target} clickEventHandler={link.clickEventHandler} />
    {/each}
  </div>
  {#if children}
    {@render children()}
  {/if}
</nav>
