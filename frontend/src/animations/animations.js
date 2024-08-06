import {keyframes} from "@emotion/react"

export const greetingAnimation_in = keyframes `
    0% {
    letter-spacing: -0.5em;
    opacity: 0;
    }
    40% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
`

export const greetingAnimation_out = keyframes `
    0% {
    opacity: 1;
    }
    50% {
        opacity: 1;
    }
    100% {
        letter-spacing: -0.5em;
        opacity: 0;
    }
`