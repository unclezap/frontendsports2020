import { createStore, applyMiddleware} from 'redux'
import rootUnion from './rootUnion';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootUnion, composeWithDevTools(applyMiddleware(thunk)))

export default store