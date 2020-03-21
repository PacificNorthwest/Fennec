import { createStore } from 'redux'
import { install } from 'redux-loop';
import { rootReducer } from './reducers'

const initialState = {
    records: [],
    ready: false
}

export default createStore(rootReducer, initialState, install());