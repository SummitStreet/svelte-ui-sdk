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
 * Unit tests for the constructs in src/lib/component/NavigationBar.svelte.
 */

import { createRawSnippet } from "svelte";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import type { NavigationBarContext } from "../../../../src/lib/components/NavigationBar.svelte";
import NavigationBar from "../../../../src/lib/components/NavigationBar.svelte";

const minimalContext: NavigationBarContext = { links: [] };

const standardContext: NavigationBarContext = {
  title: "Test Title",
  links: [
    { id: "link-button", label: "button-label", clickEventHandler: () => {} },
    { id: "link-a", label: "a-label", href: "https://example.com" },
  ],
};

describe("NavigationBar", () => {
  describe("markup", () => {
    test("nav element is rendered", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext } });
      await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("nav element uses default class name when custom class name not provided", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext } });
      await expect.element(screen.getByRole("navigation")).toHaveClass("navigation-bar");
    });

    test("nav element uses custom class name when provided", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext, className: "navigation-class" } });
      await expect.element(screen.getByRole("navigation")).toHaveClass("navigation-class");
    });

    test("nav element has the correct id attribute", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext, id: "navigation-id" } });
      await expect.element(screen.getByRole("navigation")).toHaveAttribute("id", "navigation-id");
    });

    test("span element renders the title text", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      await expect.element(screen.getByText("Test Title")).toBeInTheDocument();
    });

    test("span element is not rendered when title is not specified", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext } });
      const spanElement = screen.container.querySelector("nav > span");
      expect(spanElement?.textContent).toBe("");
    });

    test("span element has empty content when title is an empty string", async () => {
      const context: NavigationBarContext = { ...standardContext, title: "" };
      const screen = await render(NavigationBar, { props: { context } });
      const spanElement = screen.container.querySelector("nav > span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement?.textContent).toBe("");
    });

    test("span element has empty content when title is undefined", async () => {
      const context: NavigationBarContext = { ...standardContext, title: undefined };
      const screen = await render(NavigationBar, { props: { context } });
      const spanElement = screen.container.querySelector("nav > span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement?.textContent).toBe("");
    });

    test("div element is rendered", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext } });
      const navElement = screen.container.querySelector("nav");
      const divElement = navElement?.children[1];
      expect(divElement?.tagName.toLowerCase()).toBe("div");
      expect(divElement?.className).toContain("-links");
    });

    test("div element uses default class name when custom class name not provided", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      const navElement = screen.container.querySelector("nav");
      const divElement = navElement?.children[1];
      expect(divElement).toHaveClass("navigation-bar-links");
    });

    test("div element uses custom class name when provided", async () => {
      const screen = await render(NavigationBar, {
        props: { context: standardContext, className: "navigation-class" },
      });
      const navElement = screen.container.querySelector("nav");
      const divElement = navElement?.children[1];
      expect(divElement).toHaveClass("navigation-class-links");
    });

    test("div element is empty when no context links are specified", async () => {
      const screen = await render(NavigationBar, { props: { context: minimalContext } });
      const navElement = screen.container.querySelector("nav");
      const divElement = navElement?.children[1];
      expect(divElement?.children.length).toBe(0);
      await expect.element(screen.getByRole("button")).not.toBeInTheDocument();
      await expect.element(screen.getByRole("link")).not.toBeInTheDocument();
    });

    test("div element children use default class name when custom class name not provided", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      await expect.element(screen.getByRole("button", { name: "button-label" })).toHaveClass("navigation-bar-button");
      await expect.element(screen.getByRole("link", { name: "a-label" })).toHaveClass("navigation-bar-button");
    });

    test("div element children use custom class name when custom class name not provided", async () => {
      const screen = await render(NavigationBar, {
        props: { context: standardContext, className: "navigation-class" },
      });
      await expect.element(screen.getByRole("button", { name: "button-label" })).toHaveClass("navigation-class-button");
      await expect.element(screen.getByRole("link", { name: "a-label" })).toHaveClass("navigation-class-button");
    });

    test("div element contains the correct number of child elements", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      const navElement = screen.container.querySelector("nav");
      const divElement = navElement?.children[1];
      expect(divElement?.children.length).toBe(2);
    });

    test("div element contains a button element for a link without an href", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      await expect.element(screen.getByRole("button", { name: "button-label" })).toBeInTheDocument();
    });

    test("div element contains an a element for a link with an href", async () => {
      const screen = await render(NavigationBar, { props: { context: standardContext } });
      await expect.element(screen.getByRole("link", { name: "a-label" })).toBeInTheDocument();
    });

    test("button element calls clickEventHandler when clicked", async () => {
      const handler = vi.fn();
      const context: NavigationBarContext = {
        links: [{ id: "link-click", label: "Click Me", clickEventHandler: handler }],
      };
      const screen = await render(NavigationBar, { props: { context } });
      await screen.getByRole("button", { name: "Click Me" }).click();
      expect(handler).toHaveBeenCalledOnce();
    });

    test("button element does not call clickEventHandler before interaction", async () => {
      const handler = vi.fn();
      const context: NavigationBarContext = {
        links: [{ id: "link-idle", label: "Idle", clickEventHandler: handler }],
      };
      await render(NavigationBar, { props: { context } });
      expect(handler).not.toHaveBeenCalled();
    });

    test("nav element contains child elements if specified in properties", async () => {
      const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));

      const context: NavigationBarContext = {
        ...standardContext,
      };
      const screen = await render(NavigationBar, { props: { context, children: children } });
      const divElement = screen.container.querySelector("nav")?.children[2];
      expect(divElement?.tagName.toLowerCase()).toBe("div");
      expect(divElement?.textContent).toBe("foobar");
    });
  });
});
