import * as ActionNames from './actionNames'
import { loop, Cmd } from 'redux-loop'

import * as Effects from '../effects/effects'

export function rootReducer(state, action) {
    switch (action.type) {
        case ActionNames.INITIALIZE_ITEMS:
            return loop({
                ...state,
                ready: true,
                records: action.payload.records
            }, Cmd.none)
        
        case ActionNames.DELETE_ITEM:
            const newState = duplicateState(state);
            const recordIndex = newState.records.indexOf(action.payload);
            if (recordIndex !== -1) {
                newState.records.splice(recordIndex, 1)
            }

            return loop(
                newState,
                Cmd.run(Effects.updateRecordsStore, { args: [newState.records] }))

        default: return state
    }
}

function duplicateState(state) { 
    return {
        ...state
    } 
}