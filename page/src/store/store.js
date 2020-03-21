import { createStore } from 'redux'
import { rootReducer } from './reducers'

const defultState = {
    records: [],
    ready: false
}

export default createStore(rootReducer, defultState);