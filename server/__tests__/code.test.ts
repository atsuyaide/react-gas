import { describe, expect, it } from "vitest";
import { convertToOptions } from "../code";

describe("convertToOptions", () => {
  it("simple", () => {
    const keys = ["a", "b"];
    const values = [[1, 2]];
    const expected = [{ a: 1, b: 2 }];
    expect(convertToOptions(keys, values)).toStrictEqual(expected);
  });

  it("double", () => {
    const keys = ["a", "b"];
    const values = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    expect(convertToOptions(keys, values)).toStrictEqual(expected);
  });

  it("string", () => {
    const keys = ["a", "b"];
    const values = [["1", "2"]];
    const expected = [{ a: "1", b: "2" }];
    expect(convertToOptions(keys, values)).toStrictEqual(expected);
  });
});
