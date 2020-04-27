import {
    FETCH_SCORES_REQUEST,
    FETCH_SCORES_SUCCESS,
    FETCH_SCORES_FAILURE
} from './articleTypes'

const initialState = {
    scores: [],
    loading: false
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SCORES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_SCORES_SUCCESS:
            return {
                ...state,
                loading: false,
                scores: action.payload
            };
        case FETCH_SCORES_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default scoreReducer