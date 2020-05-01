import {
    FETCH_BATCHES_REQUEST,
    FETCH_BATCHES_SUCCESS,
    FETCH_BATCHES_FAILURE
} from './batchTypes'

const initialState = {
    batch: {},
    loading: false,
    failure: false,
    loaded: false,
    error: "",
    exception: ""
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BATCHES_REQUEST:
            return {
                ...state,
                loading: true,
                failure: false
            };
        case FETCH_BATCHES_FAILURE:
            return {
                ...state,
                loading: false,
                failure: true,
                error: action.error,
                exception: action.exception
            }    
        case FETCH_BATCHES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                batch: action.payload,
            };
       
        default:
            return state;
    }
}

export default batchReducer