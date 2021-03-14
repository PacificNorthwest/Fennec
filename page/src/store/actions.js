import {
    DELETE_ITEM,
    INITIALIZE_ITEMS,
    COPY_ITEM_TO_CLIPBOARD,
    SUCCESS_TOAST,
    ERROR_TOAST,
    EXPORT_RECORDS,
    OPEN_IMPORT_POPUP,
    CLOSE_IMPORT_POPUP,
    IMPORT_RECORDS } from './actionNames';

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}

export function copyToClipboard(item) {
    return {
        type: COPY_ITEM_TO_CLIPBOARD,
        payload: item
    }
}

export function initializeItems(data) {
    return {
        type: INITIALIZE_ITEMS,
        payload: data
    }
}

export function successToast(message) {
    return {
        type: SUCCESS_TOAST,
        payload: message
    }
}

export function errorToast(message) {
    return {
        type: ERROR_TOAST,
        payload: message
    }
}

export function exportRecords() {
    return {
        type: EXPORT_RECORDS,
    }
}

export function openImportPopup() {
    return {
        type: OPEN_IMPORT_POPUP
    }
}

export function closeImportPopup() {
    return {
        type: CLOSE_IMPORT_POPUP
    }
}

export function importRecords(records) {
    return {
        type: IMPORT_RECORDS,
        payload: records
    }
}