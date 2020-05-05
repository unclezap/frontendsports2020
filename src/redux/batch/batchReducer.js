import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS,
    FETCH_BATCHES_REQUEST,
    FETCH_BATCHES_FAILURE,
    FETCH_BATCHES_SUCCESS
} from './batchTypes'

const initialState = {
    batches: {},
    loading: false,
    failure: false,
    loaded: false,
    error: "",
    exception: ""
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true,
                failure: false,
                loaded: false
            };
        case POST_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                failure: true,
                error: action.error,
                exception: action.exception
            }    
        case POST_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                batches: action.payload,
            };
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
                batches: action.payload,
            };
       
        default:
            return state;
    }
}

export default batchReducer