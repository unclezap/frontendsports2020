import { combineReducers } from 'redux';
import articleReducer from './article/articleReducer'
import scoreReducer from './score/scoreReducer'

const rootReducer = combineReducers({
    article: articleReducer,
    score: scoreReducer
})

export default rootReducer