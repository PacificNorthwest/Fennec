import { toast } from 'react-toastify'

export function invokeSuccessToast(message) {
    toast(message, { className: 'default-toast' });
}

export function invokeErrorToast(message) {
    toast.error(message);
}