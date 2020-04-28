import { createStore} from 'redux'
import rootUnion from './rootUnion';

const store = createStore(rootUnion, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store