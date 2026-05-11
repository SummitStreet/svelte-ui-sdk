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
 * Contains TypeScript types, functions, and data that are used with the Svelte
 * Section component.
 */

import type { Snippet } from "svelte";

/**
 * SectionDescriptor defines the data structure used by Section.svelte to render
 * a hierarchy of HTML section elements.
 */
export interface SectionDescriptor {
  id: string;
  label?: string;
  title?: string | Snippet<[]>;
  description?: string | Snippet<[]>;
  properties?: Record<string, unknown>;
  sections?: SectionDescriptor[];
}

/**
 * Retrieves a potentially nested SectionDescriptor from another arbitrary
 * SectionDescriptor via its ID path.
 *
 * @param descriptor
 *    The root SectionDescriptor to be queried.
 * @param ids
 *    The ID path of the SectionDescriptor to be retrieved.
 * @returns
 *    The SectionDescriptor with the specified ID path.  If the ID path is not
 *    defined, the root SectionDescriptor is returned.  If the ID path is
 *    invalid, undefined is returned.
 */
export const getSectionDescriptorById = (
  descriptor: SectionDescriptor,
  ids: string[]
): SectionDescriptor | undefined => {
  if (ids.length === 0) {
    return descriptor;
  }
  let sections: SectionDescriptor[] | undefined = descriptor.sections;
  let section: SectionDescriptor | undefined;
  for (const id of ids) {
    section = sections?.find((currentSection) => currentSection.id === id);
    sections = section?.sections;
  }
  return section;
};

/**
 * Retrieves the indices of a potentially nested SectionDescriptor.  The indices
 * may then be used to retrieve the SectionDescriptor.
 *
 * @param descriptor
 *    The root SectionDescriptor to be queried.
 * @param ids
 *    The ID path of the SectionDescriptor to be discovered.
 * @returns
 *    A number[] that contains the indices of the discovered SectionDescriptor,
 *    or undefined if the ID path is invalid.
 */
export const getSectionDescriptorIndices = (descriptor: SectionDescriptor, ids: string[]): number[] | undefined => {
  let sections: SectionDescriptor[] | undefined = descriptor.sections;
  const indices: number[] = [];
  for (const id of ids) {
    if (!sections) {
      return undefined;
    }

    const index = sections.findIndex((section) => section.id === id);

    if (index === -1) {
      return undefined;
    }

    indices.push(index);
    sections = sections[index]?.sections;
  }
  return indices;
};
