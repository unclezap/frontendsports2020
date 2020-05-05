import { combineReducers } from 'redux';
// import articleReducer from './article/articleReducer'
import styleReducer from './style/styleReducer'
import userReducer from './user/userReducer'
import batchReducer from './batch/batchReducer'
import analysisReducer from './analysis/analysisReducer'

const rootReducer = combineReducers({
    // article: articleReducer,
    style: styleReducer,
    user: userReducer,
    batches: batchReducer,
    analysis: analysisReducer
})

export default rootReducer