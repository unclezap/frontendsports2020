import {
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS,
} from './articleTypes'

const API_ROOT = 'http://localhost:3000/'

export const addArticles = (articles) => {
    return {
        type: ADD_ARTICLES,
        payload: articles
    }
}

export const postArticle = (article) => {
    return (dispatch) => {
        dispatch(postArticleRequest());
        fetch(`${API_ROOT}/articles`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(`error: ${error}`)
                dispatch(postArticleFailure(data.error))
            } else {
                console.log(`data ${data}`)
                dispatch(postStudentSuccess(data))
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