import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE
} from './articleTypes'

const initialState = {
    articles: [],
    loading: false
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            };
        case FETCH_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default articleReducer