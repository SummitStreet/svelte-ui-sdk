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
   * The ProfileCard module is a Svelte-specific component that renders a profile,
   * including an image, name, links (e.g.: contact, social media, etc.), and a
   * biography of an entity.
   */

  import type { NavigableActionDescriptor } from "./NavigableAction.utils.ts";

  /**
   * Defines the context, or non-HTML specific state, of the ProfileCard
   * component.
   */
  export interface ProfileCardContext {
    name?: string;
    imageUrl?: string;
    links?: NavigableActionDescriptor[];
    description?: string | Snippet<[]>;
  }

  /**
   * The properties recognized by the ProfileCard component.
   */
  export interface ProfileCardProperties {
    context: ProfileCardContext;
    id?: string;
    className?: string;
    children?: Snippet<[]>;
  }

  export const defaultClassName = "profile-card";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  import NavigableAction from "./NavigableAction.svelte";

  let { context, id, className = defaultClassName, children }: ProfileCardProperties = $props();
</script>

{#snippet renderLink(link: NavigableActionDescriptor)}
  <NavigableAction id={link.id} href={link.href} target={link.target} label={link.label} icon={link.icon} clickEventHandler={link.clickEventHandler} />
{/snippet}

{#snippet renderTitle()}
  <div class={`${className}-title`}>
    <img src={context.imageUrl} alt={context.name} />
    <div class={`${className}-name`}>{context.name}</div>
    <div class={`${className}-links`}>
      {#each context.links ?? [] as contextLink (contextLink.label)}
        {@render renderLink(contextLink)}
      {/each}
    </div>
  </div>
{/snippet}

{#snippet renderDescription()}
  {#if typeof context.description === "string"}
    <p class={`${className}-description`}>{context.description}</p>
  {:else if context.description}
    <div class={`${className}-description`}>{@render context.description()}</div>
  {/if}
{/snippet}

<div {id} class={className}>
  {@render renderTitle()}
  {@render renderDescription()}
  {#if children}
    {@render children()}
  {/if}
</div>
