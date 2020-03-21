// const RECORDS_NAME = 'records';

export function loadItems() {
    return new Promise(resolve => {
        resolve({
            records: [
                {
                    content:
                        "http://img1.joyreactor.cc/pics/post/Sandara-artist-Fantasy-art-5785623.jpeg",
                    type: "image"
                },
                {
                    content:
                        "http://img0.joyreactor.cc/pics/post/kitsu%2B3-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-art-5784566.png",
                    type: "image"
                }
            ]
        });
        // chrome.storage.local.get(RECORDS_NAME, resolve);
    });
}
