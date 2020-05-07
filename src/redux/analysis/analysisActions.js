import {
    UPDATE_CORRECT_PREDICTIONS,
    REMOVE_CORRECT_PREDICTIONS,
    LOADING_FINISHED,
    CLEAR_ANALYSIS
} from './analysisTypes'

export const addCorrect = (numberCorrect, numberIncorrect, errorMargin, batchId, thisGame) => {
    return {
        type: UPDATE_CORRECT_PREDICTIONS,
        correct: numberCorrect,
        incorrect: numberIncorrect,
        errorMargin: errorMargin,
        batchId: batchId,
        thisGame: thisGame
    }
}

export const removeCorrect = (numberCorrect, numberIncorrect, errorMargin, batchId, thisGame, remove, toggleOpacityOff) => {
    if (toggleOpacityOff) {
        thisGame.opacity = 0
        console.log("toggling")
        console.log(thisGame.opacity)
    } 
    return {
        type: REMOVE_CORRECT_PREDICTIONS,
        correct: numberCorrect,
        incorrect: numberIncorrect,
        errorMargin: errorMargin,
        batchId: batchId,
        thisGame: thisGame,
        remove: remove
    }
}

export const doneLoading = () => {
    return {
        type: LOADING_FINISHED
    }
}

export const clearAnalysis = () => {
    return {
        type: CLEAR_ANALYSIS
    }
}