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
 * Unit tests for the constructs in src/lib/component/NavigableAction.svelte.
 */

import { createRawSnippet } from "svelte";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import NavigableAction from "../../../../src/lib/components/NavigableAction.svelte";

describe("NavigableAction", () => {
  describe("markup", () => {
    test("a element rendered when href is provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).toBeInTheDocument();
    });

    test("a element uses default class name when custom class name not provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).toHaveClass("navigable-action");
    });

    test("a element uses custom class name when provided", async () => {
      const screen = await render(NavigableAction, {
        label: "foobar",
        href: "https://foobar",
        className: "test-class",
      });
      await expect.element(screen.getByRole("link")).toHaveClass("test-class");
    });

    test("a element has the correct id attribute", async () => {
      const screen = await render(NavigableAction, { id: "test-link", label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).toHaveAttribute("id", "test-link");
    });

    test("a element has the correct href attribute", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).toHaveAttribute("href", "https://foobar");
    });

    test("a element has the correct target attribute", async () => {
      const screen = await render(NavigableAction, {
        props: { label: "foobar", href: "https://foobar", target: "_blank" },
      });
      await expect.element(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    test("a element has the correct aria-label", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link", { name: "foobar" })).toBeInTheDocument();
    });

    test("a element has the correct title attribute", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar", title: "foobaz" });
      await expect.element(screen.getByRole("link")).toHaveAttribute("title", "foobaz");
    });

    test("a element has visible class when visible is true", async () => {
      const screen = await render(NavigableAction, {
        label: "foobar",
        href: "https://foobar",
        visible: true,
      });
      await expect.element(screen.getByRole("link")).toHaveClass("visible");
    });

    test("a element does not have visible class when visible is false", async () => {
      const screen = await render(NavigableAction, {
        label: "foobar",
        href: "https://foobar",
        visible: false,
      });
      await expect.element(screen.getByRole("link")).not.toHaveClass("visible");
    });

    test("a element does not have visible class when visible is not provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).not.toHaveClass("visible");
    });

    test("a element has the correct rel attribute when target is _blank", async () => {
      const screen = await render(NavigableAction, {
        props: { label: "foobar", href: "https://foobar", target: "_blank" },
      });
      await expect.element(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("a element does not have the rel attribute when target is not _blank", async () => {
      const screen = await render(NavigableAction, {
        props: { label: "foobar", href: "https://foobar", target: "_self" },
      });
      await expect.element(screen.getByRole("link")).not.toHaveAttribute("rel");
    });

    test("a element does not have the rel attribute when target is not provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
      await expect.element(screen.getByRole("link")).not.toHaveAttribute("rel");
    });

    test("button element rendered when href is not provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar" });
      await expect.element(screen.getByRole("button")).toBeInTheDocument();
    });

    test("button element uses default class name when custom class name not provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar" });
      await expect.element(screen.getByRole("button")).toHaveClass("navigable-action");
    });

    test("button element uses custom class name when provided", async () => {
      const screen = await render(NavigableAction, { label: "foobar", className: "test-class" });
      await expect.element(screen.getByRole("button")).toHaveClass("test-class");
    });

    test("button element has the correct id attribute", async () => {
      const screen = await render(NavigableAction, { id: "test-button", label: "foobar" });
      await expect.element(screen.getByRole("button")).toHaveAttribute("id", "test-button");
    });

    test("button element has the correct title attribute", async () => {
      const screen = await render(NavigableAction, { label: "foobar", title: "foobaz" });
      await expect.element(screen.getByRole("button")).toHaveAttribute("title", "foobaz");
    });

    test("button element renders the label as text content", async () => {
      const screen = await render(NavigableAction, { label: "foobar" });
      await expect.element(screen.getByText("foobar")).toBeInTheDocument();
    });

    test("button element sets aria-label from the label prop", async () => {
      const screen = await render(NavigableAction, { label: "foobar" });
      await expect.element(screen.getByRole("button", { name: "foobar" })).toBeInTheDocument();
    });

    test("button element does not have visible class by default", async () => {
      const screen = await render(NavigableAction, { label: "foobar" });
      await expect.element(screen.getByRole("button")).not.toHaveClass("visible");
    });

    test("button element has visible class when visible is true", async () => {
      const screen = await render(NavigableAction, { label: "foobar", visible: true });
      await expect.element(screen.getByRole("button")).toHaveClass("visible");
    });

    test("button element clicked event invokes clickEventHandler", async () => {
      const handler = vi.fn();
      const screen = await render(NavigableAction, { label: "foobar", clickEventHandler: handler });
      await screen.getByRole("button").click();
      expect(handler).toHaveBeenCalledOnce();
    });

    test("button element does not call clickEventHandler before interaction", async () => {
      const handler = vi.fn();
      await render(NavigableAction, { label: "foobar", clickEventHandler: handler });
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("snippets", () => {
    describe("content()", () => {
      test("a element contains child elements if included in properties", async () => {
        const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          href: "https://foobar",
          children: children,
        });
        const divElement = screen.container.querySelector("a")?.children[0];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
        expect(divElement?.textContent).toBe("foobar");
      });

      test("a element contains child elements and ignores icon if both are included in properties", async () => {
        const icon = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
        const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          href: "https://foobar",
          icon: icon,
          children: children,
        });
        const divElement = screen.container.querySelector("a")?.children[0];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
        expect(divElement?.textContent).toBe("foobar");
      });

      test("a element contains icon snippet when icon is included in properties and children is undefined", async () => {
        const icon = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          href: "https://foobar",
          icon: icon,
        });
        const imgElement = screen.container.querySelector("a")?.children[0];
        expect(imgElement?.tagName.toLowerCase()).toBe("img");
        expect(imgElement).toHaveAttribute("src", "tests/data/circle.svg");
        expect(imgElement).toHaveAttribute("alt", "Circle");
      });

      test("a element does not contain child elements when children and icon are undefined", async () => {
        const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
        const aElement = screen.container.querySelector("a");
        expect(aElement?.children.length).toBe(0);
      });

      test("a element renders label if icon and children are undefined", async () => {
        const screen = await render(NavigableAction, { label: "foobar", href: "https://foobar" });
        await expect.element(screen.getByText("foobar")).toBeInTheDocument();
      });

      test("button element contains child elements if included in properties", async () => {
        const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          children: children,
        });
        const divElement = screen.container.querySelector("button")?.children[0];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
        expect(divElement?.textContent).toBe("foobar");
      });

      test("button element contains child elements and ignores icon if both are included in properties", async () => {
        const icon = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
        const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          icon: icon,
          children: children,
        });
        const divElement = screen.container.querySelector("button")?.children[0];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
        expect(divElement?.textContent).toBe("foobar");
      });

      test("button element contains icon snippet when icon is included in properties and children is undefined", async () => {
        const icon = createRawSnippet(() => ({ render: () => `<img src="tests/data/circle.svg" alt="Circle"/>` }));
        const screen = await render(NavigableAction, {
          label: "foobar",
          icon: icon,
        });
        const imgElement = screen.container.querySelector("button")?.children[0];
        expect(imgElement?.tagName.toLowerCase()).toBe("img");
        expect(imgElement).toHaveAttribute("src", "tests/data/circle.svg");
        expect(imgElement).toHaveAttribute("alt", "Circle");
      });

      test("button element does not contain child elements when children and icon are undefined", async () => {
        const screen = await render(NavigableAction, { label: "foobar" });
        const buttonElement = screen.container.querySelector("button");
        expect(buttonElement?.children.length).toBe(0);
      });

      test("button element renders label if icon and children are undefined", async () => {
        const screen = await render(NavigableAction, { label: "foobar" });
        await expect.element(screen.getByText("foobar")).toBeInTheDocument();
      });
    });
  });
});
