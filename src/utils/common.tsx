import { MODES } from "./constants";

export const getBackendURL = (appMode: string) => {
  switch (appMode) {
    case MODES.PILOT:
      return process.env.NEXT_PUBLIC_BACKEND_URL;
    case MODES.DEMO:
      return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
    default:
      return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
  }
};

export const generateRandom10DigitNumber = () => {
  // Generate a random number with exactly 10 digits
  const min = 1000000000; // Smallest 10-digit number
  const max = 9999999999; // Largest 10-digit number

  // Generate a random number in the range [min, max]
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
};

export const getResultOfPrompt = (id: string, baseUrl: string) => {
  switch (id) {
    case "query#1234567890":
      return [
        {
          bytes: 116,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example1.csv`,
        },
      ];
    case "query#1234567891": {
      return [
        {
          bytes: 221,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example4.csv`,
        },
      ];
    }
    case "query#1234567892": {
      return [
        {
          bytes: 104,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example3.csv`,
        },
      ];
    }
    case "query#1234567893": {
      return [
        {
          bytes: 226,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example2.csv`,
        },
      ];
    }
    case "query#1234567894": {
      return [
        {
          bytes: 125,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example4.csv`,
        },
      ];
    }
    default:
      return [
        {
          bytes: 3778,
          database: "helical-math-378821",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/dummy.csv`,
        },
      ];
  }
};
