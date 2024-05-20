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