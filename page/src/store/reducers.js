import { INITIALIZE_ITEMS } from './actionNames'

export function rootReducer(state, action) {
    switch (action.type) {
        case INITIALIZE_ITEMS:
            return {
                ...state,
                ready: true,
                records: action.payload.records
            }

        default: return state
    }
}