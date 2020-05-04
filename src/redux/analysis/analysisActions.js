import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

export const addCorrect = (number) => {
    return {
        type: UPDATE_CORRECT_PREDICTIONS,
        payload: number
    }
}