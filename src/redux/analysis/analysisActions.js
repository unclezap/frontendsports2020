import {
    UPDATE_CORRECT_PREDICTIONS,
    REMOVE_CORRECT_PREDICTIONS,
    CHANGE_THE_PAST,
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

export const removeCorrect = (numberCorrect, numberIncorrect, errorMargin, batchId, thisGame, remove) => {
    // if (toggleOpacityOff === 1) {
    //     thisGame.opacity = 0
    //     console.log("toggling")
    //     console.log(thisGame.opacity)
    // } 
    // console.log("not toggling", toggleOpacityOff)
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

export const changeThePast = (numberCorrect, numberIncorrect, errorMargin, batchId, thisGame, remove) => {
    return {
        type: CHANGE_THE_PAST,
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