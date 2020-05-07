import { combineReducers } from 'redux';
// import articleReducer from './article/articleReducer'
import styleReducer from './style/styleReducer'
import userReducer from './user/userReducer'
import batchReducer from './batch/batchReducer'
import analysisReducer from './analysis/analysisReducer'
import superAnalysisReducer from './superAnalysis/superAnalysisReducer'

const rootReducer = combineReducers({
    // article: articleReducer,
    style: styleReducer,
    user: userReducer,
    batches: batchReducer,
    analysis: analysisReducer,
    chart: superAnalysisReducer
})

export default rootReducer