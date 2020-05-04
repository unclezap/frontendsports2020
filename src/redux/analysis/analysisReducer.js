import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

const initialState = {
    correct: 0
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CORRECT_PREDICTIONS:
            return {
                correct: state.correct + action.payload
            }
        default:
            return state;
    }
}

export default batchReducer