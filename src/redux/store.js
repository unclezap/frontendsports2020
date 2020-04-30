import { createStore, applyMiddleware} from 'redux'
import rootUnion from './rootUnion';
import thunk from 'redux-thunk';


const store = createStore(rootUnion, applyMiddleware(thunk))

// const store = createStore(rootUnion, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store

// import { createStore, applyMiddleware } from 'redux';
// import otherMiddleware from 'other-middleware';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers/yourRootReducer';
// export default (initialState) => {
//   const store = createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(thunk, otherMiddleware())
//   );
//   return store;
// }