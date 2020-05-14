import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    FETCH_BATCHES_REQUEST,
    FETCH_BATCHES_FAILURE,
    FETCH_BATCHES_SUCCESS,
} from './batchTypes'

const API_ROOT = 'http://localhost:3000'

const token = () => localStorage.getItem("token")

const headers = () => {
    return {
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization: token()
    }
}

//======= single article actions
export const postArticle = (article) => {
    return (dispatch) => {
        dispatch(postArticleRequest());
        fetch(`${API_ROOT}/articles`, {
           method: "POST",
           headers: headers(),
           body: JSON.stringify({article: article})
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postArticleFailure(data.error, data.exception))
            } else {
                dispatch(postArticleSuccess(data))
            }
        })
        .catch(error => {
            dispatch(postArticleFailure(error))
        })
    }
}

export const postArticleRequest = (article) => {
    return {
        type: POST_ARTICLE_REQUEST,
        payload: article
    }
}

export const postArticleFailure = (error, exception) => {
    return {
        type: POST_ARTICLE_FAILURE,
        error: error,
        exception: exception
    }
}

export const postArticleSuccess = (article) => {
    return {
        type: POST_ARTICLE_SUCCESS,
        payload: article
    }
}

//====== batches actions
export const fetchBatches = () => {
    return (dispatch) => {
        dispatch(fetchBatchesRequest());
        fetch(`${API_ROOT}/batches`, {
           method: "GET",
           headers: headers(),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchBatchesFailure(data.error, data.exception))
            } else {
                dispatch(fetchBatchesSuccess(data))
            }
        })
        .catch(error => {
            dispatch(fetchBatchesFailure(error))
        })
    }
}

export const fetchBatchesRequest = () => {
    return {
        type: FETCH_BATCHES_REQUEST
    }
}

export const fetchBatchesFailure = (error, exception) => {
    return {
        type: FETCH_BATCHES_FAILURE,
        error: error,
        exception: exception
    }
}

export const fetchBatchesSuccess = (batches) => {
    return {
        type: FETCH_BATCHES_SUCCESS,
        payload: batches
    }
}