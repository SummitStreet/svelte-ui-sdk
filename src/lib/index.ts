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
 * Defines all module exports.
 */

import ItemRotator, { type ItemRotatorProperties } from "./components/ItemRotator.svelte";
import NavigableAction, { type NavigableActionProperties } from "./components/NavigableAction.svelte";
import type { NavigableActionDescriptor } from "./components/NavigableAction.utils.ts";
import NavigationBar, {
  type NavigationBarContext,
  type NavigationBarProperties,
} from "./components/NavigationBar.svelte";
import ProfileCard, { type ProfileCardContext, type ProfileCardProperties } from "./components/ProfileCard.svelte";
import Section, { type SectionProperties } from "./components/Section.svelte";
import {
  getSectionDescriptorById,
  getSectionDescriptorIndices,
  type SectionDescriptor,
} from "./components/Section.utils.ts";

export {
  getSectionDescriptorById,
  getSectionDescriptorIndices,
  ItemRotator,
  type ItemRotatorProperties,
  NavigableAction,
  type NavigableActionDescriptor,
  type NavigableActionProperties,
  NavigationBar,
  type NavigationBarContext,
  type NavigationBarProperties,
  ProfileCard,
  type ProfileCardContext,
  type ProfileCardProperties,
  Section,
  type SectionDescriptor,
  type SectionProperties,
};
