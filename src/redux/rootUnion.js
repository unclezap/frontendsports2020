import { combineReducers } from 'redux';
import articleReducer from './article/articleReducer'
import styleReducer from './style/styleReducer'
import userReducer from './user/userReducer'
import batchReducer from './batch/batchReducer'

const rootReducer = combineReducers({
    article: articleReducer,
    style: styleReducer,
    user: userReducer,
    batch: batchReducer
})

export default rootReducer