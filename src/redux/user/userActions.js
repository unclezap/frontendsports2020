import {
    CREATE_USER_REQUEST,
    CREATE_USER_FAILURE,
    CREATE_USER_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    LOG_OUT
} from './userTypes'


// const API_ROOT = 'https://backendsports2020.herokuapp.com'
const API_ROOT = 'http://localhost:3000'

//user creation
export const postNewUser = (user) => {
    return (dispatch) => {
        dispatch(createUserRequest());
        fetch(`${API_ROOT}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user: user})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.user) {
                alert ("Account creation successful!")
                localStorage.setItem("token", data.jwt)
                dispatch(createUserSuccess(data))
            } else {
                alert ("That username is unacceptable or has already been taken")
                dispatch(createUserFailure(data.error, data.exception))
            }
        })
    }
}

export const createUserRequest = (user) => {
    return {
        type: CREATE_USER_REQUEST,
        payload: user
    }
}

export const createUserFailure = (error, exception) => {
    return {
        type: CREATE_USER_FAILURE,
        error: error,
        exception: exception
    }
}

export const createUserSuccess = (user) => {
    console.log("create user success")
    return {
        type: CREATE_USER_SUCCESS,
        payload: user
    }
}

//old user login
export const postLogin = (uservalue) => {
    return (dispatch) => {
        dispatch(signInRequest());
        fetch(`${API_ROOT}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user: uservalue})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                console.log("in the if")
                dispatch(signInFailure(data.error, data.exception))
                alert ("Sorry, that didn't work.  Please sign up or try a different password.")
            } else {
                if (data.message) {
                    console.log("in the else, postlogi")
                    alert ("Login successful!")
                }
                localStorage.setItem("token", data.jwt)
                dispatch(signInSuccess(data))
            }
        })
        .catch(error => {
            dispatch(signInFailure(error))
        })
    }
}

export const signInRequest = (user) => {
    return {
        type: SIGN_IN_REQUEST,
        payload: user
    }
}

export const signInFailure = (error, exception) => {
    return {
        type: SIGN_IN_FAILURE,
        error: error,
        exception: exception
    }
}

export const signInSuccess = (user) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signOut = () => {
    return {
        type: LOG_OUT
    }
}