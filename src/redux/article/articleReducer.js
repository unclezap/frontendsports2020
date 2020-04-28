import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE
} from './articleTypes'

const initialState = {
    article: {},
    loading: false
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case POST_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                article: action.payload
            };
        case POST_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default articleReducer