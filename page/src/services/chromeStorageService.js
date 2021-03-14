/* global chrome */
const RECORDS_NAME = 'fennecRecords';

class ChromeStorageService {
    loadItemsFromStorage() {
        return new Promise(resolve => {
            chrome.storage.local.get(RECORDS_NAME, result => resolve(result[RECORDS_NAME] || []));
        });
    }
    
    saveItemsToStorage(records) {
        return new Promise(resolve => {
            chrome.storage.local.set({ [RECORDS_NAME]: records }, resolve);
        })
    }
}

export default new ChromeStorageService();