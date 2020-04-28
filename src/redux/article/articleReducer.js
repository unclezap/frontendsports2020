import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE
} from './articleTypes'

const initialState = {
    article: {},
    loading: false,
    failure: false,
    error: "",
    exception: ""
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true,
                failure: false
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
                article: action.payload,
            };
       
        default:
            return state;
    }
}

export default articleReducer