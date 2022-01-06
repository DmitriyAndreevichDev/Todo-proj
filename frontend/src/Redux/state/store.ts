import { combineReducers, createStore, applyMiddleware } from 'redux'
import authReducer, {Auth} from '../redusers/authReducer'

import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";


export default interface Store {
    auth: Auth
}

const reducer = combineReducers({
    auth: authReducer,

})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
