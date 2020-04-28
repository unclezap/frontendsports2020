import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS,
} from './articleTypes'

const API_ROOT = 'http://localhost:3000/'

export const postArticle = (article) => {
    return (dispatch) => {
        dispatch(postArticleRequest());
        fetch(`${API_ROOT}/articles`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(article)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(`error: ${data.error}`)
                dispatch(postArticleFailure(data.error))
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

export const postArticleFailure = (error) => {
    return {
        type: POST_ARTICLE_FAILURE,
        error: error
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