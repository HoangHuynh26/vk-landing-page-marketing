import { isVideoReady } from "./Hero";

describe("isVideoReady", () => {
  test("returns true when the browser can begin playback", () => {
    expect(isVideoReady({ readyState: 3 })).toBe(true);
  });

  test("returns false before playback data is available", () => {
    expect(isVideoReady({ readyState: 2, buffered: { length: 0 } })).toBe(false);
  });
});
