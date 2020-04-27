import {
    FETCH_SCORE_REQUEST,
    FETCH_SCORE_SUCCESS,
    FETCH_SCORE_FAILURE,
} from './scoreTypes'

export const fetchScoreRequest = (score) => {
    return {
        type: FETCH_SCORE_REQUEST,
        payload: score
    }
}

export const fetchScoreSuccess = (score) => {
    return {
        type: FETCH_SCORE_SUCCESS,
        payload: score
    }
}

export const fetchScoreFailure = (error) => {
    return {
        type: FETCH_SCORE_FAILURE,
        error: error
    }
}

export const fetchScore = (scoreId) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/scores/${scoreId}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchScoreFailure(data.error))
                console.log(data.error)
            } else {
                dispatch(fetchScoreSuccess(data))
                console.log("got the SCORE!")
            }
        })
    }
}