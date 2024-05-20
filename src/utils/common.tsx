import { MODES } from "./constants"

export const getBackendURL = (appMode : string) => {
    switch(appMode){
        case MODES.PILOT:
            return process.env.NEXT_PUBLIC_BACKEND_URL;
        case MODES.DEMO:
            return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
        default:
            return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
    } 
}

export const generateRandom10DigitNumber = () => {
    // Generate a random number with exactly 10 digits
    const min = 1000000000; // Smallest 10-digit number
    const max = 9999999999; // Largest 10-digit number
  
    // Generate a random number in the range [min, max]
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
  }