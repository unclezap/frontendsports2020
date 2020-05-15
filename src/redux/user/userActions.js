import {
    CREATE_USER_REQUEST,
    CREATE_USER_FAILURE,
    CREATE_USER_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    LOG_OUT
} from './userTypes'
import express from 'express'
import request from 'request'

const app = express()

const API_ROOT = 'https://backendsports2020.herokuapp.com'
// const API_ROOT = 'http://localhost:3000'

const PORT = process.env.PORT || 3000
//user creation
export const postNewUser = (user) => {
    return (dispatch) => {
        dispatch(createUserRequest());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origins', '*');
            next();
        })

        app.get('/auth', (req, res) => {
            request(
                {url: `${API_ROOT}/auth`},
                (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        return res.status(500).json({type: 'error', message: error.message})
                    }

                    res.json(JSON.parse(body))
                }
            )
        })

        app.listen(PORT, (data) => {
            localStorage.setItem("token", data.jwt)
            dispatch(createUserSuccess(data))
        })

        // fetch(`${API_ROOT}/users`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({user: user})
        // })
        // .then(res => res.json())
        // .then(data => {
        //     if (data.error) {
        //         dispatch(createUserFailure(data.error, data.exception))
        //     } else {
        //         localStorage.setItem("token", data.jwt)
        //         dispatch(createUserSuccess(data))
        //     }
        // })
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
    return {
        type: CREATE_USER_SUCCESS,
        payload: user
    }
}

//old user login
export const postLogin = (uservalue) => {
    return (dispatch) => {
        dispatch(signInRequest());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origins', '*');
            next();
        })

        app.get('/auth', (req, res) => {
            request(
                {url: `${API_ROOT}/auth`},
                (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        return res.status(500).json({type: 'error', message: error.message})
                    }

                    res.json(JSON.parse(body))
                }
            )
        })

        app.listen(PORT, (data) => {
            localStorage.setItem("token", data.jwt)
            dispatch(signInSuccess(data))
        })
        // fetch(`${API_ROOT}/auth`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({user: uservalue})
        // })
        // .then(res => res.json())
        // .then(data => {
        //     if (data.error) {
        //         dispatch(signInFailure(data.error, data.exception))
        //     } else {
        //         localStorage.setItem("token", data.jwt)
        //         dispatch(signInSuccess(data))
        //     }
        // })
        // .catch(error => {
        //     dispatch(signInFailure(error))
        // })
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