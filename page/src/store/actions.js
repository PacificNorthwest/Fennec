import { DELETE_ITEM, INITIALIZE_ITEMS } from './actionNames';

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}

export function initializeItems(data) {
    return {
        type: INITIALIZE_ITEMS,
        payload: data
    }
}