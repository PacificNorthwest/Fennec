import ChromeStorageService from '../services/chromeStorageService' 

export function updateRecordsStore(records) {
    return ChromeStorageService.saveItemsToStorage(records);
}