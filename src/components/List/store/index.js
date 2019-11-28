import { createStore, applyMiddleware, combineReducers,compose } from 'redux'
import listFormReducer from '../reducer/listFormReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    listForm: listFormReducer
})

let store = createStore(reducer, /* preloadedState, */ composeEnhancers())
export default store