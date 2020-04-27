import {
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE
} from './articleTypes'

export const fetchArticleRequest = (article) => {
    return {
        type: FETCH_ARTICLE_REQUEST,
        payload: article
    }
}

export const fetchArticleSuccess = (article) => {
    return {
        type: FETCH_ARTICLE_SUCCESS,
        payload: article
    }
}

export const fetchArticleFailure = (error) => {
    return {
        type: FETCH_ARTICLE_FAILURE,
        error: error
    }
}

export const fetchArticlesRequest = (articles) => {
    return {
        type: FETCH_ARTICLES_REQUEST,
        payload: articles
    }
}

export const fetchArticlesSuccess = (articles) => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload: article
    }
}

export const fetchArticlesFailure = (error) => {
    return {
        type: FETCH_ARTICLES_FAILURE,
        error: error
    }
}


export const fetchArticles = () => {
    return (dispatch) => {
        dispatch(fetchArticlesRequest())
        fetch('http://localhost:3000/articles')
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchArticlesFailure(data.error));
                console.log(data.error)
            } else {
                dispatch(fetchArticlesSuccess(data))
                console.log("got the articles!")
            }
        })
    }
}

export const fetchArticle = (articleId) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/articles/${articleId}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchArticleFailure(data.error))
                console.log(data.error)
            } else {
                dispatch(fetchArticleSuccess(data))
                console.log("got the article!")
            }
        })
    }
}