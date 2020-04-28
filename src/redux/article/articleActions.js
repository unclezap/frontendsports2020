import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS,
} from './articleTypes'

const API_ROOT = 'http://localhost:3000/'

const token = () => localStorage.getItem("token")

const headers = () => {
    return {
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization: token()
    }
}

export const postArticle = (article) => {
    return (dispatch) => {
        dispatch(postArticleRequest());
        fetch(`${API_ROOT}/articles`, {
           method: "POST",
           headers: headers(),
           body: JSON.stringify(article)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postArticleFailure(data.error, data.exception))
            } else {
                dispatch(postArticleSuccess(data))
            }
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

// export const fetchArticle = (articleId) => {
//     return (dispatch) => {
//         fetch(`http://localhost:3000/articles/${articleId}`)
//         .then(res => res.json())
//         .then(data => {
//             if (data.error) {
//                 dispatch(fetchArticleFailure(data.error))
//                 console.log(data.error)
//             } else {
//                 dispatch(fetchArticleSuccess(data))
//                 console.log("got the article!")
//             }
//         })
//     }
// }