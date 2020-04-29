import { createStore, applyMiddleware} from 'redux'
import rootUnion from './rootUnion';
import thunk from 'redux-thunk';

const store = createStore(rootUnion, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store