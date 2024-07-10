import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/words.js", () => {
  return {
    getWord: jest.fn(() => "APPLE"),
    isWord: jest.fn(() => true),
  };
});

const { Wordle, buildLetter } = await import("../src/wordle.js");

describe("building a letter object", () => {
  test("returns a letter object", () => {
    const letterObj = buildLetter("J", "cool");
    expect(letterObj).toEqual({
      letter: "J",
      status: "cool",
    });
  });
});

describe("constructing a new Wordle game", () => {
  test("set maxGuesses to 6 if no argument", () => {
    const newWordleMaxGuess = new Wordle();
    expect(newWordleMaxGuess.maxGuesses).toBe(6);
  });
  test("set maxGuesses to passed value in argument", () => {
    const newWordle3 = new Wordle(3);
    expect(newWordle3.maxGuesses).toBe(3);
  });
  test("set guesses to an array with length maxGuesses", () => {
    const newWordleArray = new Wordle();
    expect(newWordleArray.guesses.length).toBe(6);
  });
  test("set currGuess to 0", () => {
    const newWordleCurrGuess = new Wordle();
    expect(newWordleCurrGuess.currGuess).toBe(0);
  });
  test("set word to a word from getWord", () => {
    const newWordleWord = new Wordle();
    expect(newWordleWord.word).toBe("APPLE");
  });
});

describe("test build guess from word", () => {
  test("sets status of a correct letter to CORRECT", () => {
    const newWordleCorrect = new Wordle();
    const results = newWordleCorrect.buildGuessFromWord("A____");
    expect(results[0]).toEqual({
      letter: "A",
      status: "CORRECT",
    });
  });
  test("sets status of a present letter to PRESENT", () => {
    const newWordlePresent = new Wordle();
    const results = newWordlePresent.buildGuessFromWord("E____");
    expect(results[0]).toEqual({
      letter: "E",
      status: "PRESENT",
    });
  });
  test("sets status of an absent letter to ABSENT", () => {
    const newWordleAbsent = new Wordle();
    const results = newWordleAbsent.buildGuessFromWord("Z____");
    expect(results[0]).toEqual({
      letter: "Z",
      status: "ABSENT",
    });
  });
});
