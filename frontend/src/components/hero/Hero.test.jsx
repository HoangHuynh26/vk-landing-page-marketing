import { hasInitialVideoBuffer } from "./Hero";

describe("hasInitialVideoBuffer", () => {
  test("returns true once the first ten seconds are buffered", () => {
    const video = {
      buffered: {
        length: 1,
        end: () => 10,
      },
      currentTime: 0,
    };

    expect(hasInitialVideoBuffer(video)).toBe(true);
  });

  test("returns false when less than ten seconds are buffered", () => {
    const video = {
      buffered: {
        length: 1,
        end: () => 9.9,
      },
      currentTime: 0,
    };

    expect(hasInitialVideoBuffer(video)).toBe(false);
  });
});
