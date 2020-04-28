import { combineReducers } from 'redux';
import articleReducer from './article/articleReducer'
import batchReducer from './batch/batchReducer'

const rootReducer = combineReducers({
    article: articleReducer,
    batch: batchReducer
})

export default rootReducer