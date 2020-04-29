import {
    KILL_CSS,
    REVIVE_CSS
} from './styleTypes'

export const kill = () => {
    return {
        type: KILL_CSS,
    }
}

export const revive = () => {
    return {
        type: REVIVE_CSS,
    }
}