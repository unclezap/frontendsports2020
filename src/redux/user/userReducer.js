import {
    CREATE_USER_REQUEST,
    CREATE_USER_FAILURE,
    CREATE_USER_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    LOG_OUT
} from './userTypes'

const initialState = {
    user: {},
    loading: false,
    failure: false,
    error: "",
    exception: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                failure: false
            }
        case SIGN_IN_FAILURE:
        case CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                failure: true,
                error: action.error,
                exception: action.exception
            }
        case SIGN_IN_SUCCESS:
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case LOG_OUT:
            return {
                initialState
            }
        default:
            return state;
    }
}

export default userReducer