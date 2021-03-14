export function copyItemToClipboard(item) {
    return navigator.clipboard.writeText(item.content);
}