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
            console.log("requesting")
            return {
                ...state,
                loading: true
            };
        case POST_ARTICLE_SUCCESS:
            console.log("success")
            return {
                ...state,
                loading: false,
                article: action.payload
            };
        case POST_ARTICLE_FAILURE:
            console.log("failure")
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default articleReducer