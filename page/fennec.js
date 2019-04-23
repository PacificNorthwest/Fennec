const filters = [
    { name: 'All', type: 'all' },
    { name: 'Images and GIFs', type: 'image' },
    { name: 'Videos', type: ['youtube', 'video'] },
    { name: 'Links', type: 'link' },
    { name: 'Text', type: 'text' }
]

function remove(sender, record) {
    chrome.storage.local.get('records', result => {
        var index = result.records.findIndex(element => element.content == record.content);
        result.records.splice(index, 1);

        chrome.storage.local.set(result, function() {
            sender.addClass('removed');
            setTimeout(() => { 
                sender.remove();
                if (result.records.length == 0) {
                    $('#menu-buttons-container').attr('style', 'display: none !important');
                    $('#empty-records-list-notification').show();
                }
            }, 700);
        });
    })
}

function renderRecords(filter) {
    chrome.storage.local.get('records', result => {
        if (result.records && result.records.length > 0) {
            $('#empty-records-list-notification').hide()
            $('#menu-buttons-container').attr('style', 'display: inline-block !important');
            $('#container').empty()
            
            if (filter && typeof(filter) == "string" && filter != 'all') {
                result.records = result.records.filter(record => filter.includes(record.type))
            }

            result.records.forEach(element => {
                var content;
                if (element.type == 'image') {
                    content = $("<img>").attr('src', element.content)
                } else if (element.type == 'youtube') {
                    content = $('<iframe></iframe>').attr('width', '560px')
                                                    .attr('height', '315px')
                                                    .attr('src', element.content)
                                                    .attr('frameborder', "0")
                                                    .attr('allow', 'encrypted-media')
                                                    .attr('allowfullscreen', true)
                } else if (element.type == 'link') {
                    content = $('<a></a>').attr('href', element.content).attr('target', '_blank').text(element.content)
                } else if (element.type == 'text') {
                    content = $('<span></span>').text(element.content)
                } else return
    
                var body = $('<div></div>').addClass('card-body').append(content);
                var removeButton = $('<button></button>').addClass('btn btn-danger remove-button')
                    .append($('<span></span>').addClass('oi oi-x').attr('style', 'display: contents'));
                var copyToClipboard = $('<button></button>').addClass('btn copy-clipboard-button')
                    .append($('<span></span>')
                    .addClass('oi oi-clipboard')
                    .attr('style', 'display: contents'))
                    .on('click', async () => {
                        await navigator.clipboard.writeText(element.content);
                        popup = $('#popup');
                        popup.css('opacity', 0.6);
                        setTimeout(() => popup.css('opacity', 0), 3000);
                    });
                var card = $('<div></div>')
                    .addClass('item card mb-5 shadow-lg bg-light text-light position-relative')
                    .append(body)
                    .append(removeButton)
                    .append(copyToClipboard);
    
                removeButton.click(() => { remove(card, element) });
                $('#container').append(card);
            });
        } else {
            $('#empty-records-list-notification').attr('style', 'display: inline !important');
        }
    })
}

$('#remove-all-button').click(function () {
    chrome.storage.local.clear();
    $('.item').remove();
    $('#menu-buttons-container').attr('style', 'display: none !important');
    $('#empty-records-list-notification').show();
})

filters.forEach(entry => {
    $('#filter-select').append($('<option></option>').attr('value', entry.type).text(entry.name))
})

$('#filter-select').on('change', (e) => {
    renderRecords(e.target.value)
})

$(document).ready(renderRecords);
