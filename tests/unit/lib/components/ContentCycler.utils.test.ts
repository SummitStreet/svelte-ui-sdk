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
 * Unit tests for the constructs in src/lib/components/ContentCycler.utils.ts.
 */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { startContentCycle } from "../../../../src/lib/components/ContentCycler.utils.ts";

/** Returns a fresh set of vi.fn() mocks for the three rotation callbacks. */
const makeMocks = () => ({
  onHide: vi.fn(),
  onAdvance: vi.fn<(n: number) => void>(),
  onShow: vi.fn(),
});

describe("startContentCycle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("no-op guard", () => {
    test("returns a function when count is 0", () => {
      const cleanup = startContentCycle({ count: 0, interval: 1000, transition: 100, ...makeMocks() });
      expect(typeof cleanup).toBe("function");
    });

    test("returns a function when count is 1", () => {
      const cleanup = startContentCycle({ count: 1, interval: 1000, transition: 100, ...makeMocks() });
      expect(typeof cleanup).toBe("function");
    });

    test("does not call any callbacks when count is 0", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 0, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(5000);
      expect(mocks.onHide).not.toHaveBeenCalled();
      expect(mocks.onAdvance).not.toHaveBeenCalled();
      expect(mocks.onShow).not.toHaveBeenCalled();
    });

    test("does not call any callbacks when count is 1", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 1, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(5000);
      expect(mocks.onHide).not.toHaveBeenCalled();
      expect(mocks.onAdvance).not.toHaveBeenCalled();
      expect(mocks.onShow).not.toHaveBeenCalled();
    });
  });

  describe("callback sequencing", () => {
    test("calls onHide after the interval elapses", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1000);
      expect(mocks.onHide).toHaveBeenCalledTimes(1);
    });

    test("does not call onHide before the interval elapses", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(999);
      expect(mocks.onHide).not.toHaveBeenCalled();
    });

    test("calls onAdvance after the interval and transition elapse", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1100);
      expect(mocks.onAdvance).toHaveBeenCalledTimes(1);
    });

    test("does not call onAdvance before the transition elapses", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1000);
      expect(mocks.onAdvance).not.toHaveBeenCalled();
    });

    test("calls onShow after the interval and transition elapse", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1100);
      expect(mocks.onShow).toHaveBeenCalledTimes(1);
    });

    test("calls onHide, then onAdvance, then onShow within a single cycle", async () => {
      const callOrder: string[] = [];
      startContentCycle({
        count: 3,
        interval: 1000,
        transition: 100,
        onHide: () => {
          callOrder.push("hide");
        },
        onAdvance: () => {
          callOrder.push("advance");
        },
        onShow: () => {
          callOrder.push("show");
        },
      });
      await vi.advanceTimersByTimeAsync(1100);
      expect(callOrder).toEqual(["hide", "advance", "show"]);
    });
  });

  describe("index advancement", () => {
    test("calls onAdvance with index 1 after the first cycle", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1100);
      expect(mocks.onAdvance).toHaveBeenCalledWith(1);
    });

    test("calls onAdvance with index 2 after the second cycle", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(2200);
      expect(mocks.onAdvance).toHaveBeenLastCalledWith(2);
    });

    test("calls onAdvance with index 0 after advancing through all items", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(3300);
      expect(mocks.onAdvance).toHaveBeenLastCalledWith(0);
    });

    test("calls onAdvance with the correct index after wrapping around", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(4400);
      expect(mocks.onAdvance).toHaveBeenLastCalledWith(1);
    });

    test("calls onAdvance the correct number of times across multiple cycles", async () => {
      const mocks = makeMocks();
      startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(3300);
      expect(mocks.onAdvance).toHaveBeenCalledTimes(3);
    });
  });

  describe("cleanup", () => {
    test("returns a cleanup function when count is greater than 1", () => {
      const cleanup = startContentCycle({ count: 3, interval: 1000, transition: 100, ...makeMocks() });
      expect(typeof cleanup).toBe("function");
    });

    test("stops the rotation cycle after the cleanup function is invoked", async () => {
      const mocks = makeMocks();
      const cleanup = startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      cleanup();
      await vi.advanceTimersByTimeAsync(5000);
      expect(mocks.onHide).not.toHaveBeenCalled();
    });

    test("does not start a second cycle after cleanup is invoked between cycles", async () => {
      const mocks = makeMocks();
      const cleanup = startContentCycle({ count: 3, interval: 1000, transition: 100, ...mocks });
      await vi.advanceTimersByTimeAsync(1100); // complete one full cycle
      cleanup();
      await vi.advanceTimersByTimeAsync(2200); // two more cycles would have fired
      expect(mocks.onHide).toHaveBeenCalledTimes(1);
    });
  });
});
