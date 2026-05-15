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
 * Unit tests for src/lib/components/ItemRotator.svelte.
 */

import { createRawSnippet } from "svelte";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import ItemRotator, {
  defaultClassName,
  defaultInterval,
  defaultTransition,
} from "../../../../src/lib/components/ItemRotator.svelte";

/**
 * Duration of one complete rotation cycle: the interval elapses, the current
 * item fades out, and the next item fades in.
 */
const defaultCycle = defaultInterval + defaultTransition;

/** Text items used across tests. */
const textItems = ["First", "Second", "Third"];

describe("ItemRotator", () => {
  describe("markup", () => {
    test("span element is rendered by default", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      expect(screen.container.firstElementChild?.tagName.toLowerCase()).toBe("span");
    });

    test("div element is rendered when elementType is 'div'", async () => {
      const screen = await render(ItemRotator, { items: textItems, elementType: "div" });
      expect(screen.container.firstElementChild?.tagName.toLowerCase()).toBe("div");
    });

    test("p element is rendered when elementType is 'p'", async () => {
      const screen = await render(ItemRotator, { items: textItems, elementType: "p" });
      expect(screen.container.firstElementChild?.tagName.toLowerCase()).toBe("p");
    });

    test("section element is rendered when elementType is 'section'", async () => {
      const screen = await render(ItemRotator, { items: textItems, elementType: "section" });
      expect(screen.container.firstElementChild?.tagName.toLowerCase()).toBe("section");
    });

    test("span element has no id attribute when one is not provided", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await expect.element(screen.getByText(textItems[0]!)).not.toHaveAttribute("id");
    });

    test("span element has correct id attribute when id is provided", async () => {
      const screen = await render(ItemRotator, { items: textItems, id: "test-id" });
      await expect.element(screen.getByText(textItems[0]!)).toHaveAttribute("id", "test-id");
    });

    test("span element uses default class name when custom class name not provided", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await expect.element(screen.getByText(textItems[0]!)).toHaveClass(defaultClassName);
    });

    test("span element uses custom class name when provided", async () => {
      const screen = await render(ItemRotator, { items: textItems, className: "test-class" });
      await expect.element(screen.getByText(textItems[0]!)).toHaveClass("test-class");
    });

    test("span element does not apply the default class name when a custom class name is provided", async () => {
      const screen = await render(ItemRotator, { items: textItems, className: "custom-class" });
      await expect.element(screen.getByText(textItems[0]!)).not.toHaveClass(defaultClassName);
    });

    test("span element does not have the hidden class on initial render", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await expect.element(screen.getByText(textItems[0]!)).not.toHaveClass("hidden");
    });

    test("span element has the correct aria-live attribute", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await expect.element(screen.getByText(textItems[0]!)).toHaveAttribute("aria-live", "polite");
    });

    test("span element renders nothing when items array is empty", async () => {
      const screen = await render(ItemRotator, { items: [] });
      expect(screen.container.firstElementChild?.textContent).toBe("");
    });

    test("span element renders the first text item on mount", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await expect.element(screen.getByText(textItems[0]!)).toBeInTheDocument();
    });

    test("span element renders a single text item", async () => {
      const screen = await render(ItemRotator, { items: ["foobar"] });
      await expect.element(screen.getByText("foobar")).toBeInTheDocument();
    });

    test("span element renders the first Snippet item on mount", async () => {
      const snippet1 = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
      const snippet2 = createRawSnippet(() => ({ render: () => `<p>foobar</p>` }));
      const snippet3 = createRawSnippet(() => ({ render: () => `<div>foobaz</div>` }));
      const screen = await render(ItemRotator, { items: [snippet1, snippet2, snippet3] });
      expect(screen.container.querySelector("img")).not.toBeNull();
    });

    test("span element renders a single Snippet item", async () => {
      const snippet = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
      const screen = await render(ItemRotator, { items: [snippet] });
      expect(screen.container.querySelector("img")).not.toBeNull();
    });
  });

  describe("$effect()", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("span element does not have the hidden class when no items are provided", async () => {
      const screen = await render(ItemRotator, { items: [] });
      await vi.advanceTimersByTimeAsync(defaultInterval);
      expect(screen.container.firstElementChild?.classList.contains("hidden")).toBe(false);
    });

    test("span element does not have the hidden class when only one item is provided", async () => {
      const screen = await render(ItemRotator, { items: ["foobar"] });
      await vi.advanceTimersByTimeAsync(defaultInterval);
      await expect.element(screen.getByText("foobar")).not.toHaveClass("hidden");
    });

    test("span element does not change displayed content when only one item is provided", async () => {
      const screen = await render(ItemRotator, { items: ["foobar"] });
      await vi.advanceTimersByTimeAsync(defaultCycle * 3);
      await expect.element(screen.getByText("foobar")).toBeInTheDocument();
    });

    test("span element has hidden class after default interval lapses", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultInterval);
      await expect.element(screen.getByText(textItems[0]!)).toHaveClass("hidden");
    });

    test("span element does not have hidden class after full default cycle elapses", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultCycle);
      await expect.element(screen.getByText(textItems[1]!)).not.toHaveClass("hidden");
    });

    test("span element has hidden class after custom interval elapses", async () => {
      const screen = await render(ItemRotator, { items: textItems, interval: 1000 });
      await vi.advanceTimersByTimeAsync(1000);
      await expect.element(screen.getByText(textItems[0]!)).toHaveClass("hidden");
    });

    test("span element does not have hidden class after custom interval and transition elapse", async () => {
      const screen = await render(ItemRotator, { items: textItems, interval: 1000, transition: 200 });
      await vi.advanceTimersByTimeAsync(1200);
      await expect.element(screen.getByText(textItems[1]!)).not.toHaveClass("hidden");
    });

    test("span element content does not rotate before interval has elapsed", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultInterval - 1);
      await expect.element(screen.getByText(textItems[0]!)).toBeInTheDocument();
    });

    test("span element content advances to 2nd item after one full cycle", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultCycle);
      await expect.element(screen.getByText(textItems[1]!)).toBeInTheDocument();
    });

    test("span element content advances to 3rd item after two full cycles", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultCycle * 2);
      await expect.element(screen.getByText(textItems[2]!)).toBeInTheDocument();
    });

    test("span element content advances through all items in order", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      for (let i = 1; i < textItems.length; i++) {
        await vi.advanceTimersByTimeAsync(defaultCycle);
        await expect.element(screen.getByText(textItems[i]!)).toBeInTheDocument();
      }
    });

    test("span element content resets to 1st item after advancing through all items", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultCycle * textItems.length);
      await expect.element(screen.getByText(textItems[0]!)).toBeInTheDocument();
    });

    test("span element content continues to advance correctly after advancing through all items", async () => {
      const screen = await render(ItemRotator, { items: textItems });
      await vi.advanceTimersByTimeAsync(defaultCycle * (textItems.length + 1));
      await expect.element(screen.getByText(textItems[1]!)).toBeInTheDocument();
    });

    test("span element content transitions from Snippet to text item after one full cycle", async () => {
      const snippet = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
      const screen = await render(ItemRotator, { items: [snippet, "foobar"] });
      await vi.advanceTimersByTimeAsync(defaultCycle);
      await expect.element(screen.getByText("foobar")).toBeInTheDocument();
    });

    test("span element content transitions correctly using non-default intervals", async () => {
      const screen = await render(ItemRotator, { items: textItems, interval: 1000, transition: 100 });
      await vi.advanceTimersByTimeAsync(1100);
      await expect.element(screen.getByText(textItems[1]!)).toBeInTheDocument();
    });

    test("span element content does not transition before non-default interval elapses", async () => {
      const screen = await render(ItemRotator, { items: textItems, interval: 1000 });
      await vi.advanceTimersByTimeAsync(999);
      await expect.element(screen.getByText(textItems[0]!)).toBeInTheDocument();
    });
  });
});
