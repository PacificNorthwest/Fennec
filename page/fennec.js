function remove(sender, record) {
    chrome.storage.local.get('records', result => {
        var index = result.records.findIndex(element => element.content == record.content);
        result.records.splice(index, 1);

        chrome.storage.local.set(result, function() {
            sender.addClass('removed');
            setTimeout(() => { 
                sender.remove();
                if (result.records.length == 0) {
                    $('#remove-all-button-container').attr('style', 'display: none !important');
                    $('#empty-records-list-notification').show();
                }
            }, 700);
        });
    })
}

chrome.storage.local.get('records', result => {
    if (result.records && result.records.length > 0) {
        $('#empty-records-list-notification').hide()
        $('#remove-all-button-container').attr('style', 'display: inline-block !important');

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
                content = $('<a></a>').attr('href', element.content).text(element.content)
            } else if (element.type == 'text') {
                content = $('<span></span>').text(element.content)
            } else return

            var body = $('<div></div>').addClass('card-body').append(content);
            var removeButton = $('<button></button>').addClass('btn btn-danger remove-button')
                .append($('<span></span>').addClass('oi oi-x').attr('style', 'display: contents'));
            var card = $('<div></div>')
                .addClass('item card mb-5 shadow-lg bg-light text-light position-relative')
                .append(body)
                .append(removeButton);

            removeButton.click(() => { remove(card, element) });
            $('#container').append(card);
        });
    }
})

$('#remove-all-button').click(function () {
    chrome.storage.local.clear();
    $('.item').remove();
    $('#remove-all-button-container').attr('style', 'display: none !important');
    $('#empty-records-list-notification').show();
})
