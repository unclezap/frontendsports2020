import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

export const addCorrect = (numberCorrect, numberIncorrect, errorMargin) => {
    return {
        type: UPDATE_CORRECT_PREDICTIONS,
        correct: numberCorrect,
        incorrect: numberIncorrect,
        errorMargin: errorMargin
    }
}