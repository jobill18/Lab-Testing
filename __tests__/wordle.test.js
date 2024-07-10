import { buildLetter } from "../src/wordle";

describe("building a letter object", () => {
  test("returns a letter object", () => {
    const letterObj = buildLetter("J", "cool");
    expect(letterObj).toEqual({
      letter: "J",
      status: "cool",
    });
  });
});
