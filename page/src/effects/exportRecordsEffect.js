const EXPORT_FILENAME = 'fennec_records.json';

export async function exportRecords(records) {
    const exportPayload = new Blob(
        [JSON.stringify(records)], { type: 'text/json' }
    )

    var tempElement = window.document.createElement('a');
    tempElement.href = window.URL.createObjectURL(exportPayload);
    tempElement.download = EXPORT_FILENAME;        
    document.body.appendChild(tempElement);
    tempElement.click();        
    document.body.removeChild(tempElement);
}