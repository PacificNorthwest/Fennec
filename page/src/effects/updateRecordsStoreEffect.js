export function updateRecordsStore(records) {
    return new Promise(resolve => {
        console.log('Chrome storage updated...')
        resolve();
        // chrome.storage.local.set(records, resolve);
    })
}