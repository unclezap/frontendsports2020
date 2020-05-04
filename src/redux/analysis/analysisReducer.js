import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

const initialState = {
    correct: 0,
    loaded: false
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CORRECT_PREDICTIONS:
            return {
                correct: state.correct + action.payload,
                loaded: true
            }
        default:
            return state;
    }
}

export default batchReducer