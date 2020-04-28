import { combineReducers } from 'redux';
import articleReducer from './article/articleReducer'
import batchReducer from './batch/batchReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
    article: articleReducer,
    batch: batchReducer,
    user: userReducer
})

export default rootReducer