import { loop, Cmd } from 'redux-loop'

import * as ActionNames from './actionNames'
import * as Effects from '../effects/effects'
import { successToast, errorToast, closeImportPopup } from './actions';

import { wrapFeedback } from '../effects/effectWrappers/effectFeedbackWrapper'

import { SUCCESS_RECORDS_IMPORT } from '../common/constants/toastMessages';

import FeedbacksProvider from '../services/feedbacksProvider';

export function rootReducer(state, action) {
    let newState = cloneState(state);
    switch (action.type) {
        case ActionNames.INITIALIZE_ITEMS:
            newState.ready = true;
            newState.records = action.payload;

            return loop(newState, Cmd.none)
        
        case ActionNames.DELETE_ITEM:
            const recordIndex = newState.records.indexOf(action.payload);
            if (recordIndex !== -1) {
                newState.records.splice(recordIndex, 1)
            }

            return loop(newState, Cmd.run(Effects.updateRecordsStore, { args: [newState.records] }))

        case ActionNames.COPY_ITEM_TO_CLIPBOARD:
            return loop(
                newState,
                Cmd.run(wrapFeedback(Effects.copyItemToClipboard, FeedbacksProvider.getFeedback(Effects.copyItemToClipboard)), {
                    args: [action.payload],
                    successActionCreator: successToast,
                    failActionCreator: errorToast })
            );

        case ActionNames.EXPORT_RECORDS:
            return loop(
                newState,
                Cmd.run(wrapFeedback(Effects.exportRecords, FeedbacksProvider.getFeedback(Effects.exportRecords)), {
                    args: [state.records],
                    successActionCreator: successToast,
                    failActionCreator: errorToast
                })
            );
        
        case ActionNames.OPEN_IMPORT_POPUP:
            newState.isImportPopupOpen = true;
            return loop(newState, Cmd.none);
        
        case ActionNames.CLOSE_IMPORT_POPUP:
            newState.isImportPopupOpen = false;
            return loop(newState, Cmd.none);

        case ActionNames.IMPORT_RECORDS:
            newState.records = newState.records.concat(action.payload);

            return loop(
                newState, 
                Cmd.list([
                    Cmd.run(Effects.updateRecordsStore, { args: [newState.records] }),
                    Cmd.action(closeImportPopup()),
                    Cmd.action(successToast(SUCCESS_RECORDS_IMPORT))
                ])
            );

        case ActionNames.SUCCESS_TOAST:
            return loop(newState, Cmd.run(Effects.invokeSuccessToast, { args: [action.payload] }));
        
        case ActionNames.ERROR_TOAST:
            return loop(newState, Cmd.run(Effects.invokeErrorToast, { args: [action.payload] }));

        default: return loop(newState, Cmd.none);
    }
}

function cloneState(state) { 
    return {
        ...state
    } 
}