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
 * Unit tests for the constructs in src/lib/component/{ProfileCard}.svelte.
 */

import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import type { ProfileCardContext } from "../../../../src/lib/components/ProfileCard.svelte";
import ProfileCard from "../../../../src/lib/components/ProfileCard.svelte";

const emptyContext: ProfileCardContext = {};

const context: ProfileCardContext = {
  name: "Not Sure",
  imageUrl: "tests/data/circle.svg",
  description: "The most average person in the world.",
  links: [
    { id: "link-button", label: "button-label", clickEventHandler: () => {} },
    { id: "link-a", label: "a-label", href: "https://foobar" },
  ],
};

describe("ProfileCard", () => {
  describe("markup", () => {
    test("div element is rendered", async () => {
      const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
      const divElement = screen.container.children[0];
      expect(divElement?.tagName.toLowerCase()).toBe("div");
    });

    test("div element uses default class name when custom class name not provided", async () => {
      const screen = await render(ProfileCard, { props: { context: emptyContext } });
      const divElement = screen.container.children[0];
      expect(divElement?.className).toBe("profile-card");
    });

    test("div element uses custom class name when provided", async () => {
      const screen = await render(ProfileCard, { props: { context: emptyContext, className: "test-class" } });
      const divElement = screen.container.children[0];
      expect(divElement?.className).toBe("test-class");
    });

    test("div element has the correct id attribute", async () => {
      const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
      const divElement = screen.container.children[0];
      expect(divElement).toHaveAttribute("id", "test-id");
    });

    test("div element contains child elements if specified in properties", async () => {
      const children = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
      const screen = await render(ProfileCard, { props: { context: context, id: "test-id", children: children } });
      const divElement = screen.container.children[0]?.children[2];
      expect(divElement?.tagName.toLowerCase()).toBe("div");
      expect(divElement?.textContent).toBe("foobar");
    });
  });

  describe("snippets", () => {
    describe("renderTitle()", () => {
      test("div element is rendered", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
      });

      test("div element uses default class name when custom class name not provided", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0];
        expect(divElement?.className).toBe("profile-card-title");
      });

      test("div element uses custom class name when provided", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, className: "test-class" } });
        const divElement = screen.container.querySelector("div")?.children[0];
        expect(divElement?.className).toBe("test-class-title");
      });

      test("img element is rendered", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const imgElement = screen.container.querySelector("div")?.children[0]?.children[0];
        expect(imgElement?.tagName.toLowerCase()).toBe("img");
      });

      test("img element has correct src attribute", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const imgElement = screen.container.querySelector("div")?.children[0]?.children[0];
        expect(imgElement).toHaveAttribute("src", "tests/data/circle.svg");
      });

      test("img element has correct alt attribute", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const imgElement = screen.container.querySelector("div")?.children[0]?.children[0];
        expect(imgElement).toHaveAttribute("alt", "Not Sure");
      });

      test("div element containing name is rendered", () => {
        const screen = render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[1];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
      });

      test("div element containing name uses default class name when custom class name not provided", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[1];
        expect(divElement?.className).toBe("profile-card-name");
      });

      test("div element containing name uses custom class name when provided", () => {
        const screen = render(ProfileCard, {
          props: { context: context, id: "test-id", className: "test-class" },
        });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[1];
        expect(divElement?.className).toBe("test-class-name");
      });

      test("div element containing name has correct text content", () => {
        const screen = render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[1];
        expect(divElement?.textContent?.trim()).toBe("Not Sure");
      });

      test("div element containing links is rendered", () => {
        const screen = render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
      });

      test("div element containing links uses default class name when custom class name not provided", async () => {
        const screen = await render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.className).toBe("profile-card-links");
      });

      test("div element containing links uses custom class name when provided", () => {
        const screen = render(ProfileCard, {
          props: { context: context, id: "test-id", className: "test-class" },
        });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.className).toBe("test-class-links");
      });

      test("div element containing links has no children when context links is undefined", () => {
        const screen = render(ProfileCard, { props: { context: emptyContext, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.children.length).toBe(0);
      });

      test("div element containing links has no children when context links is empty", () => {
        const screen = render(ProfileCard, {
          props: { context: { ...emptyContext, links: [] }, id: "test-id" },
        });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.children.length).toBe(0);
      });

      test("div element containing links has correct number of children when context links has elements", () => {
        const screen = render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.children.length).toBe(2);
      });

      test("div element containing links has children with correct state", () => {
        const screen = render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[0]?.children[2];
        expect(divElement?.children[0]?.tagName.toLowerCase()).toBe("button");
        expect(divElement?.children[0]?.textContent).toBe("button-label");
        expect(divElement?.children[1]?.tagName.toLowerCase()).toBe("a");
        expect(divElement?.children[1]?.textContent).toBe("a-label");
      });
    });

    describe("renderDescription()", () => {
      test("p element is rendered when context description is a string", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const pElement = screen.container.querySelector("div")?.children[1];
        expect(pElement?.tagName.toLowerCase()).toBe("p");
      });

      test("p element uses default class name when custom class name not provided", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const pElement = screen.container.querySelector("div")?.children[1];
        expect(pElement?.className).toBe("profile-card-description");
      });

      test("p element uses custom class name when provided", async () => {
        const screen = await render(ProfileCard, {
          props: { context: context, id: "test-id", className: "test-class" },
        });
        const pElement = screen.container.querySelector("div")?.children[1];
        expect(pElement?.className).toBe("test-class-description");
      });

      test("p element has correct text content", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const pElement = screen.container.querySelector("div")?.children[1];
        expect(pElement?.textContent).toBe("The most average person in the world.");
      });

      test("div element is rendered when context description is a snippet", async () => {
        const descriptionSnippet = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const modifiedContext: ProfileCardContext = {
          ...context,
          description: descriptionSnippet,
        };
        const screen = await render(ProfileCard, {
          props: { context: modifiedContext, id: "test-id" },
        });
        const divElement = screen.container.querySelector("div")?.children[1];
        expect(divElement?.tagName.toLowerCase()).toBe("div");
      });

      test("div element uses default class name when custom class name not provided", async () => {
        const screen = await render(ProfileCard, { props: { context: context, id: "test-id" } });
        const divElement = screen.container.querySelector("div")?.children[1];
        expect(divElement?.className).toBe("profile-card-description");
      });

      test("div element uses custom class name when provided", async () => {
        const screen = await render(ProfileCard, {
          props: { context: context, id: "test-id", className: "test-class" },
        });
        const divElement = screen.container.querySelector("div")?.children[1];
        expect(divElement?.className).toBe("test-class-description");
      });

      test("div element has correct inner HTML when context description is a snippet", async () => {
        const descriptionSnippet = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const modifiedContext: ProfileCardContext = {
          ...context,
          description: descriptionSnippet,
        };
        const screen = await render(ProfileCard, {
          props: { context: modifiedContext, id: "test-id" },
        });
        const divElement = screen.container.querySelector("div")?.children[1];
        expect(divElement?.innerHTML).contains("<div>foobar</div>");
      });
    });
  });
});
