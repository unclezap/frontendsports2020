import {
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
                console.log(data)
                dispatch(fetchBatchesSuccess(data))
            }
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