chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Save for Fennec',
        type: 'normal',
        id: 'fennec',
        contexts: ['image', 'link', 'video', 'selection', 'page']
    })
})

Object.defineProperty(Object.prototype, 'find', {
    value: function find(predicate) {
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                if (predicate(this[property]))
                    return { name: property, value: this[property]};
            }
        }
    }
})

function transformYouTubeLink(link) {
    var videoId;
    if (link.includes('v='))
        videoId = link.substring(link.lastIndexOf('v=') + 2);
    else
        videoId = link.substring(link.lastIndexOf('/') + 1);
    
    return 'https://www.youtube.com/embed/' + videoId;
}

const patterns = {
    youtube: {
        pattern: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i,
        transformation: transformYouTubeLink
    },
    link: {
        pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
    }
}

function resolveRecordLink(item) {
    if (item.mediaType) {
        if (patterns.youtube.pattern.test(item.pageUrl))
            return { type: 'youtube', content: patterns.youtube.transformation(item.pageUrl) }
        return { type: item.mediaType, content: item.srcUrl }
    }
    else if (item.linkUrl) {
        if (patterns.youtube.pattern.test(item.linkUrl))
            return {type: 'youtube', content: patterns.youtube.transformation(item.linkUrl) }
        return { type: 'link', content: item.linkUrl }
    }
    else if (item.selectionText) {
        var pattern;
        if (pattern = patterns.find(p => p.pattern.test(item.selectionText))) {
            var link = item.selectionText;
            if (pattern.value.transformation)
                link = pattern.value.transformation(link);
            
            return { type: pattern.name, content: link };
        } else return { type: 'text', content: item.selectionText }
    }
    else {
        return { type: 'link', content: item.pageUrl }
    }
}

function contextItemClick(info, tab) {
    if (info.menuItemId === 'fennec') {

        chrome.storage.local.get('records', result => {
            if (result.records)
                result.records.push(resolveRecordLink(info))
            else
                result.records = [resolveRecordLink(info)]
            chrome.storage.local.set(result);
        })
    }
}

chrome.contextMenus.onClicked.addListener(contextItemClick)
chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.create({ url: chrome.extension.getURL('page/index.html') })
})