import { jest } from "@jest/globals";

let mockIsWord = jest.fn(() => true);

jest.unstable_mockModule("../src/words.js", () => {
  return {
    getWord: jest.fn(() => "APPLE"),
    isWord: mockIsWord,
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

describe("test Wordle.appendGuess", () => {
  test("throws error if no more guesses are allowed", () => {
    const newWordleNoGuess = new Wordle(1);
    expect(() => {
      newWordleNoGuess.appendGuess("WORDS");
      newWordleNoGuess.appendGuess("WORDS");
    }).toThrow("No more guesses allowed");
  });
  test("throws error if guess is not length of 5", () => {
    const newWordleNoLong = new Wordle();
    expect(() => {
      newWordleNoLong.appendGuess("WORRIES");
    }).toThrow("Guess must be of length 5");
  });
  test("throws error if the guess is not a word", () => {
    const newWordleNoWord = new Wordle();
    mockIsWord.mockReturnValueOnce(false);
    expect(() => {
      newWordleNoWord.appendGuess("WORRY");
    }).toThrow("Guess must be a word");
  });
  test("increments the current guess", () => {
    const newWordleNoWord = new Wordle();
    newWordleNoWord.appendGuess("12312");
    expect(newWordleNoWord.currGuess).toEqual(1);
  });
});

describe("Test Wordle.isSolved", () => {
  test("returns true if the latest guess is the correct word", () => {
    const newWordle = new Wordle();
    newWordle.appendGuess("APPLE");
    expect(newWordle.isSolved()).toBe(true);
  });
  test("returns false if the latest guess is not the correct word", () => {
    const newWordle = new Wordle();
    newWordle.appendGuess("GUESS");
    expect(newWordle.isSolved()).toBe(false);
  });
});

describe("Test Wordle.shouldEndGame", () => {
  test("returns true if the latest guess is the correct word", () => {
    const newWordle = new Wordle();
    newWordle.appendGuess("APPLE");
    expect(newWordle.shouldEndGame()).toBe(true);
  });
  test("returns true if there are no more guesses left", () => {
    const newWordle = new Wordle(1);
    newWordle.appendGuess("GUESS");
    expect(newWordle.shouldEndGame()).toBe(true);
  });
  test("returns false if no guess has been made", () => {
    const newWordle = new Wordle(1);
    expect(newWordle.shouldEndGame()).toBe(false);
  });
  test("returns false if there are guesses left and the word has not been guessed", () => {
    const newWordle = new Wordle();
    newWordle.appendGuess("GUESS");
    expect(newWordle.shouldEndGame()).toBe(false);
  });
});
