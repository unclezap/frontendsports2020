import {
    FETCH_BATCH_REQUEST,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAILURE
} from './batchTypes'

const initialState = {
    batch: {},
    loading: false
}

const batchReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_BATCH_REQUEST:
        case FETCH_BATCH_FAILURE:
        case FETCH_BATCH_SUCCESS:
        default:
            return state;
    }
}

export default batchReducer