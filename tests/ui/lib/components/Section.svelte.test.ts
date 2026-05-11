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
 * Unit tests for the constructs in src/lib/component/Section.svelte.
 */

import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import Section from "../../../../src/lib/components/Section.svelte";
import type { SectionDescriptor } from "../../../../src/lib/components/Section.utils.ts";

const emptyContext: SectionDescriptor = { id: "root" };

const singleSectionContext: SectionDescriptor = {
  id: "root",
  sections: [{ id: "section-0", title: "section-0-title", description: "Section description." }],
};

const multiSectionContext: SectionDescriptor = {
  id: "root",
  sections: [
    { id: "section-a", title: "section-a-title", description: "section-a-description" },
    { id: "section-b", title: "section-b-title", description: "section-b-description" },
  ],
};

const hierarchicalContext: SectionDescriptor = {
  id: "root",
  sections: [
    {
      id: "section-0",
      title: "section-0-title",
      description: "section-0-description",
      sections: [
        {
          id: "section-0-0",
          title: "section-0-0-title",
          description: "description-0-0-title",
          sections: [
            {
              id: "section-0-0-0",
              title: "section-0-0-0-title",
              description: "description-0-0-0-title",
              sections: [
                { id: "section-0-0-0-0", title: "section-0-0-0-0-title", description: "description-0-0-0-0-title" },
                { id: "section-0-0-0-1", title: "section-0-0-0-1-title", description: "description-0-0-0-1-title" },
                { id: "section-0-0-0-2", title: "section-0-0-0-2-title", description: "description-0-0-0-2-title" },
              ],
            },
            { id: "section-0-0-1", title: "section-0-0-1-title", description: "description-0-0-1-title" },
            { id: "section-0-0-2", title: "section-0-0-2-title", description: "description-0-0-2-title" },
            { id: "section-0-0-3", title: "section-0-0-3-title", description: "description-0-0-3-title" },
            { id: "section-0-0-4", title: "section-0-0-4-title", description: "description-0-0-4-title" },
            { id: "section-0-0-5", title: "section-0-0-5-title", description: "description-0-0-5-title" },
          ],
        },
        { id: "section-0-1", title: "section-0-1-title", description: "description-0-1-title" },
        { id: "section-0-2", title: "section-0-2-title", description: "description-0-2-title" },
        { id: "section-0-3", title: "section-0-3-title", description: "description-0-3-title" },
        { id: "section-0-4", title: "section-0-4-title", description: "description-0-4-title" },
      ],
    },
    { id: "section-1", title: "section-1-title", description: "description-1-title" },
    { id: "section-2", title: "section-2-title", description: "description-2-title" },
  ],
};

/**
 * Traverses an HTMLCollection of potentially nested HTML elements and invokes a
 * callback for each element in the hierarchy.
 *
 * @param tagName
 *    The tag name of the elements to be matched.
 * @param elements
 *    The HTMLCollection containing the element hierarchy to be traversed.
 * @param callback
 *    The callback to be invoked for each element in the HTMLCollection
 *    hierarchy.  The callback is provided with the element and an array of
 *    indices that represents the path to the element within the hierarchy of
 *    nested elements.
 * @param indices
 *    An array of numbers that represents the path to the current element within
 *    the hierarchy of nested elements.  Under normal usage, callers should not
 *    specify a value for this parameter.
 */
const traverseNestedHtmlElements = (
  tagName: string,
  elements: HTMLCollection | undefined,
  callback: (element: Element, indices: number[]) => void,
  indices: number[] = []
) => {
  for (const [index, element] of Array.from(elements ?? []).entries()) {
    if (tagName.toLowerCase() === element?.tagName.toLowerCase()) {
      indices.push(index);
    }
    callback(element, indices);
    traverseNestedHtmlElements(tagName, element.children, callback, indices);
    if (tagName.toLowerCase() === element?.tagName.toLowerCase()) {
      indices.pop();
    }
  }
};

describe("Section", () => {
  describe("markup", () => {
    test("context with undefined sections does not render any section elements", async () => {
      const screen = await render(Section, { props: { context: emptyContext } });
      const sectionElements = screen.container.querySelectorAll("section");
      expect(sectionElements.length).toBe(0);
    });

    test("context with sections with no elements does not render any section elements", async () => {
      const screen = await render(Section, { props: { context: { ...emptyContext, sections: [] } } });
      const sectionElements = screen.container.querySelectorAll("section");
      expect(sectionElements.length).toBe(0);
    });

    test("context with single section renders a single section", async () => {
      const screen = await render(Section, { props: { context: singleSectionContext } });
      const sectionElements = screen.container.querySelectorAll("section");
      expect(sectionElements.length).toBe(1);
    });

    test("context with multiple sections renders a section element for each section", async () => {
      const screen = await render(Section, { props: { context: multiSectionContext } });
      const sectionElements = screen.container.querySelectorAll("section");
      expect(sectionElements.length).toBe(2);
    });
  });

  describe("snippets", () => {
    describe("renderSection()", () => {
      test("section element uses default class name when custom class name not provided", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const sectionElement = screen.container.querySelector("section");
        expect(sectionElement?.className).toBe("section-0");
      });

      test("section element uses custom class name when provided", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext, className: "test-class" } });
        const sectionElement = screen.container.querySelector("section");
        expect(sectionElement?.className).toBe("test-class-0");
      });

      test("section element has an id attribute", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const sectionElement = screen.container.querySelector("section");
        expect(sectionElement).toHaveAttribute("id", "section-0");
      });

      test("section element has an h2 element containing text when the title is a string", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const h2Element = screen.container.children[0]?.children[0];
        expect(h2Element).not.toBeNull();
        expect(h2Element?.textContent).toBe("section-0-title");
      });

      test("section element has an h2 element containing a snippet when the title is not a string", async () => {
        const snippet = createRawSnippet(() => ({ render: () => "<div>foobar</div>" }));
        const context: SectionDescriptor = {
          id: "root",
          sections: [{ id: "section-0", title: snippet }],
        };
        const screen = await render(Section, { props: { context } });
        const h2Element = screen.container.children[0]?.children[0];
        expect(h2Element).not.toBeNull();
        expect(h2Element?.children[0]?.tagName.toLowerCase()).toBe("div");
        expect(h2Element?.children[0]?.textContent).toBe("foobar");
      });

      test("section element has no h2 element if title is undefined", async () => {
        const context: SectionDescriptor = {
          id: "root",
          sections: [{ id: "section-0" }],
        };
        const screen = await render(Section, { props: { context } });
        const element = screen.container.children[0]?.children[0];
        expect(element?.tagName.toLowerCase()).not.toBe("h2");
      });

      test("section element contains a p element with text when the description is a string", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const pElement = screen.container.children[0]?.children[1];
        expect(pElement).not.toBeNull();
        expect(pElement?.textContent).toBe("Section description.");
      });

      test("section element contains a snippet when the description is not a string", async () => {
        const snippet = createRawSnippet(() => ({ render: () => "<div>foobaz</div>" }));
        const context: SectionDescriptor = {
          id: "root",
          sections: [{ id: "section-0", title: "foobar", description: snippet }],
        };
        const screen = await render(Section, { props: { context } });
        const element = screen.container.children[0]?.children[1];
        expect(element).not.toBeNull();
        expect(element?.tagName.toLowerCase()).toBe("div");
        expect(element?.textContent).toBe("foobaz");
      });

      test("section element does not contain a p element or snippet when description is undefined", async () => {
        const context: SectionDescriptor = {
          id: "root",
          sections: [{ id: "section-0", title: "foobar" }],
        };
        const screen = await render(Section, { props: { context } });
        const element = screen.container.children[0]?.children[1];
        expect(element?.className.toLowerCase()).toBe("section-0-contents");
      });

      test("div element container for nested sections is rendered", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const divElement = screen.container.children[0]?.children[2];
        expect(divElement).not.toBeNull();
        expect(divElement?.tagName.toLowerCase()).toBe("div");
      });

      test("div element container uses default class name when custom class name not provided", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext } });
        const divElement = screen.container.children[0]?.children[2];
        expect(divElement?.className).toBe("section-0-contents");
      });

      test("div element container uses custom class name when provided", async () => {
        const screen = await render(Section, { props: { context: singleSectionContext, className: "test-class" } });
        const divElement = screen.container.children[0]?.children[2];
        expect(divElement?.className).toBe("test-class-0-contents");
      });

      test("div element container has the correct number of child nodes", async () => {
        const screen = await render(Section, { props: { context: hierarchicalContext } });
        const divElement = screen.container.children[0]?.children[2];
        expect(divElement?.children).toHaveLength(5);
      });

      test("div element containers have the correct class name for their depth when using the default class name", async () => {
        const screen = await render(Section, { props: { context: hierarchicalContext } });
        traverseNestedHtmlElements("section", screen.container.children, (element, indices) => {
          if (element.tagName.toLowerCase() === "div") {
            const expectedClassName = `section-${indices.join("-")}-contents`;
            expect(element.className).toBe(expectedClassName);
          }
        });
      });

      test("div element containers have the correct class name for their depth when a custom class name is provided", async () => {
        const screen = await render(Section, { props: { context: hierarchicalContext, className: "test-class" } });
        traverseNestedHtmlElements("section", screen.container.children, (element, indices) => {
          if (element.tagName.toLowerCase() === "div") {
            const expectedClassName = `test-class-${indices.join("-")}-contents`;
            expect(element.className).toBe(expectedClassName);
          }
        });
      });

      test("div element container sections have the correct class name for their depth when using the default class name", async () => {
        const screen = await render(Section, { props: { context: hierarchicalContext } });
        traverseNestedHtmlElements("section", screen.container.children, (element, indices) => {
          if (element.tagName.toLowerCase() === "section") {
            const expectedClassName = `section-${indices.join("-")}`;
            expect(element.className).toBe(expectedClassName);
          }
        });
      });

      test("div element container sections have the correct class name for their depth when a custom class name is provided", async () => {
        const screen = await render(Section, { props: { context: hierarchicalContext, className: "test-class" } });
        traverseNestedHtmlElements("section", screen.container.children, (element, indices) => {
          if (element.tagName.toLowerCase() === "section") {
            const expectedClassName = `test-class-${indices.join("-")}`;
            expect(element.className).toBe(expectedClassName);
          }
        });
      });
    });
  });
});
