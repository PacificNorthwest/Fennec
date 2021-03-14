import * as Effects from '../effects'
import * as ToastMessages from '../../common/constants/toastMessages'

const feedbacks = new Map([
    [Effects.copyItemToClipboard, {
        success: ToastMessages.SUCCESS_CLIPBOARD_COPY,
        error: ToastMessages.ERROR_CLIPBOARD_COPY
    }],
    [Effects.exportRecords, {
        success: ToastMessages.SUCCESS_RECORDS_EXPORT,
        error: ToastMessages.ERROR_RECORDS_EXPORT
    }]
]);

class FeedbacksProvider {
    getFeedback(effect) {
        return feedbacks.get(effect);
    }
}

export default new FeedbacksProvider();