import { combineReducers } from 'redux';
import styleReducer from './style/styleReducer'
import userReducer from './user/userReducer'
import batchReducer from './batch/batchReducer'
import analysisReducer from './analysis/analysisReducer'

const rootReducer = combineReducers({
    style: styleReducer,
    user: userReducer,
    batches: batchReducer,
    analysis: analysisReducer,
})

export default rootReducer