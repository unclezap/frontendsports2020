import {
    UPDATE_CORRECT_PREDICTIONS,
    REMOVE_CORRECT_PREDICTIONS,
    CHANGE_THE_PAST,
    RESTORE_THE_PAST,
    LOADING_FINISHED,
    CLEAR_ANALYSIS
} from './analysisTypes'

const batchSkeleton = () => ({
    batchId: 0,
    correct: 0,
    incorrect: 0,
    errorMargin: 0,
    games: []
})

const initialState = {
    batch: [],
    loaded: false
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_CORRECT_PREDICTIONS:
                action.thisGame.opacity = 0
                console.log("toggling", action.thisGame.opacity)
        case CHANGE_THE_PAST:
        case RESTORE_THE_PAST:
        case UPDATE_CORRECT_PREDICTIONS:

            let updatedBatch = state.batch.filter(batch => batch.batchId === action.batchId)

            if (updatedBatch.length === 0) {
                updatedBatch = batchSkeleton()
            } else {
                updatedBatch = updatedBatch[0]
            }

            updatedBatch.batchId = action.batchId
            updatedBatch.correct += action.correct
            updatedBatch.incorrect += action.incorrect
            updatedBatch.errorMargin += action.errorMargin

            if (action.remove) {
                console.log("removing")
                updatedBatch.games = [...updatedBatch.games.filter(gameObject => gameObject.game[0] !== action.thisGame.game[0]).flat(),action.thisGame]

            } else {
                updatedBatch.games = [...updatedBatch.games, action.thisGame]
            }

            return {
                batch: [...state.batch.filter(batch => batch.batchId !== action.batchId), updatedBatch],
                loaded: true
            }
            // break;
        case LOADING_FINISHED:
            return {
                ...state,
                loaded: false
            }
        case CLEAR_ANALYSIS:
            return initialState
        default:
            return state;
    }
}

export default batchReducer