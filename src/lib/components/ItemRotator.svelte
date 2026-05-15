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
   * The ItemRotator module is a Svelte-specific component that repeatedly
   * renders either text values or Snippets at an interval in a specific order.
   */

  import type { Snippet } from "svelte";

  export interface ItemRotatorProperties {
    /** Array of strings or Svelte snippets to rotate through. */
    items: (string | Snippet<[]>)[];
    /** The HTML element to render. Defaults to 'span'. */
    elementType?: "span" | "div" | "p" | "section";
    /** The functional HTML ID. Use judiciously for accessibility or anchors. */
    id?: string;
    /** CSS class for the container. Defaults to 'item-rotator'. */
    className?: string;
    /** Delay between item rotations, in milliseconds. Defaults to 2500ms. */
    interval?: number;
    /** Transition delay for the hidden state, in milliseconds. Defaults to 400ms. */
    transition?: number;
  }

  export const defaultClassName = "item-rotator";
  export const defaultInterval = 2500;
  export const defaultTransition = 400;
</script>

<script lang="ts">
  const { items, elementType = "span", id, className = defaultClassName, interval = defaultInterval, transition = defaultTransition }: ItemRotatorProperties = $props();

  let index = $state(0);
  let isHidden = $state(false);
  const currentItem = $derived<string | Snippet<[]> | undefined>(items[index]);

  $effect(() => {
    if (items.length <= 1) {
      return;
    }

    const timerId = setInterval(() => {
      isHidden = true;
      setTimeout(() => {
        index = (index + 1) % items.length;
        isHidden = false;
      }, transition);
    }, interval);

    return () => clearInterval(timerId);
  });
</script>

<svelte:element this={elementType} {id} class={className} class:hidden={isHidden} aria-live="polite">
  {#if typeof currentItem === "string"}
    {currentItem}
  {:else if currentItem}
    {@render currentItem()}
  {/if}
</svelte:element>
