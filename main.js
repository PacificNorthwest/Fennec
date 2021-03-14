const RECORDS_STORAGE_NAME = 'fennecRecords';
const MENU_ITEM_ID = 'fennec';
const HREF_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Save for Fennec',
        type: 'normal',
        id: MENU_ITEM_ID,
        contexts: ['image', 'link', 'video', 'selection', 'page']
    })
})

function resolveRecordModel(item) {
    if (item.mediaType) {
        return { type: item.mediaType, content: item.srcUrl };
    }
    else if (item.linkUrl) {
        return { type: 'link', content: item.linkUrl };
    }
    else if (item.selectionText) {
        if (HREF_PATTERN.test(item.selectionText)) {
            return { type: 'link', content: item.selectionText };
        } else {
            return { type: 'text', content: item.selectionText };
        }
    }
    else {
        return { type: 'link', content: item.pageUrl }
    }
}

function contextItemClick(info) {
    if (info.menuItemId === MENU_ITEM_ID) {
        chrome.storage.local.get(RECORDS_STORAGE_NAME, result => {
            const recordModel = resolveRecordModel(info);
            if (result[RECORDS_STORAGE_NAME])
                result[RECORDS_STORAGE_NAME].push(recordModel)
            else
                result[RECORDS_STORAGE_NAME] = [recordModel]
            chrome.storage.local.set(result);
        })
    }
}

chrome.contextMenus.onClicked.addListener(contextItemClick)
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html') })
})