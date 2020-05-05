import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

const batchSkeleton = {
    batchId: 0,
    correct: 0,
    incorrect: 0,
    errorMargin: 0,
}

const initialState = {
    // correct: 0,
    // incorrect: 0,
    // errorMargin: 0,
    batch: [batchSkeleton],
    loaded: false
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CORRECT_PREDICTIONS:
            let updatedBatch = state.batch.filter(batch => batch.batchId === action.batchId)

            if (updatedBatch.length === 0) {
                updatedBatch = batchSkeleton
            } else {
                updatedBatch = updatedBatch[0]
            }

            updatedBatch.batchId = action.batchId
            updatedBatch.correct += action.correct
            updatedBatch.incorrect += action.incorrect
            updatedBatch.errorMargin += action.errorMargin

            console.log("bID", action.batchId)
            console.log("correct", action.correct)
            console.log("incorrect", action.incorrect)
            console.log("erro", action.errorMargin)
            return {
                ...state,
                batch: [...state.batch.filter(batch => batch.batchId !== action.batchId), updatedBatch],
                loaded: true
            }
        default:
            return state;
    }
}

export default batchReducer