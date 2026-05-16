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
 * ContentCycler component.
 */

export interface ContentCyclerContext {
  /** Total number of items to rotate through. */
  count: number;
  /** Delay between rotations in milliseconds. */
  interval: number;
  /** Duration of the hide transition in milliseconds. */
  transition: number;
  /** Called when the current item should begin hiding. */
  onHide: () => void;
  /** Called with the next index once the hide transition has elapsed. */
  onAdvance: (index: number) => void;
  /** Called when the next item should become visible. */
  onShow: () => void;
}

/**
 * Starts an item rotation cycle and returns a cleanup function that cancels it.
 *
 * When `count` is 0 or 1 no timers are started and the cleanup is a no-op.
 * The caller is responsible for invoking the returned function when the cycle
 * should stop (e.g. on component unmount or effect re-run).
 *
 * @param context
 *    The context used by startContentCycle to interface with consumers of the
 *    ContentCycler component.
 */
export const startContentCycle = (context: ContentCyclerContext) => {
  const { count, interval, transition, onHide, onAdvance, onShow } = context;

  if (count <= 1) {
    return () => {};
  }

  let index = 0;

  const timerId = setInterval(() => {
    onHide();
    setTimeout(() => {
      index = (index + 1) % count;
      onAdvance(index);
      onShow();
    }, transition);
  }, interval);

  return () => clearInterval(timerId);
};
