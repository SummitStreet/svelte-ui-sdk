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
 * Unit tests for the constructs in src/lib/component/Section.utils.ts.
 */

import { describe, expect, test } from "vitest";

import type { SectionDescriptor } from "../../../../src/lib/components/Section.utils.ts";
import { getSectionDescriptorById, getSectionDescriptorIndices } from "../../../../src/lib/components/Section.utils.ts";

const root: SectionDescriptor = {
  id: "root",
  sections: [
    {
      id: "section-a",
      sections: [{ id: "section-a-1" }, { id: "section-a-2" }],
    },
    { id: "section-b" },
  ],
};

const leafRoot: SectionDescriptor = { id: "root" };

describe("getSectionDescriptorById", () => {
  test("returns the root descriptor when the ID path is empty", () => {
    expect(getSectionDescriptorById(root, [])).toBe(root);
  });

  test("returns the matching descriptor for a single-element path", () => {
    const result = getSectionDescriptorById(root, ["section-b"]);
    expect(result?.id).toBe("section-b");
  });

  test("returns the matching descriptor for a multi-element path", () => {
    const result = getSectionDescriptorById(root, ["section-a", "section-a-2"]);
    expect(result?.id).toBe("section-a-2");
  });

  test("returns undefined when the first ID in the path does not exist", () => {
    expect(getSectionDescriptorById(root, ["nonexistent"])).toBeUndefined();
  });

  test("returns undefined when a subsequent ID in the path does not exist", () => {
    expect(getSectionDescriptorById(root, ["section-a", "nonexistent"])).toBeUndefined();
  });

  test("returns undefined when the root has no sections and the path is non-empty", () => {
    expect(getSectionDescriptorById(leafRoot, ["section-a"])).toBeUndefined();
  });
});

describe("getSectionDescriptorIndices", () => {
  test("returns an empty array when the ID path is empty", () => {
    expect(getSectionDescriptorIndices(root, [])).toEqual([]);
  });

  test("returns the correct index for a single-element path", () => {
    expect(getSectionDescriptorIndices(root, ["section-a"])).toEqual([0]);
    expect(getSectionDescriptorIndices(root, ["section-b"])).toEqual([1]);
  });

  test("returns the correct indices for a multi-element path", () => {
    expect(getSectionDescriptorIndices(root, ["section-a", "section-a-1"])).toEqual([0, 0]);
    expect(getSectionDescriptorIndices(root, ["section-a", "section-a-2"])).toEqual([0, 1]);
  });

  test("returns undefined when the first ID in the path does not exist", () => {
    expect(getSectionDescriptorIndices(root, ["nonexistent"])).toBeUndefined();
  });

  test("returns undefined when a subsequent ID in the path does not exist", () => {
    expect(getSectionDescriptorIndices(root, ["section-a", "nonexistent"])).toBeUndefined();
  });

  test("returns undefined when the root has no sections and the path is non-empty", () => {
    expect(getSectionDescriptorIndices(leafRoot, ["section-a"])).toBeUndefined();
  });

  test("returns undefined when a matched section has no children and the path continues", () => {
    expect(getSectionDescriptorIndices(root, ["section-b", "section-a-1"])).toBeUndefined();
  });
});
