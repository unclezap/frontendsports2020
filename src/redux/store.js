import { createStore, applyMiddleware} from 'redux'
import rootUnion from './rootUnion';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootUnion, composeWithDevTools(applyMiddleware(thunk)))

export default store


// const store = createStore(rootUnion, thunk(applyMiddleware(composeWithDevTools)))

//this one works
// const store = createStore(rootUnion, applyMiddleware(thunk))

// const store = createStore(rootUnion, applyMiddleware(thunk(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())))

// const store = createStore(rootUnion, applyMiddleware(thunk(window.__REDUX_DEVTOOLS_EXTENSION__())))

// const store = createStore(rootUnion, window.__REDUX_DEVTOOLS_EXTENSION__, applyMiddleware(window.__REDUX_DEVTOOLS_EXTENSION__(thunk)))

//this one works
// const store = createStore(rootUnion, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


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