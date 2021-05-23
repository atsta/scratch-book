
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // https://developer.chrome.com/docs/extensions/mv3/messaging/#simple

    if(!sender.tab) {
        console.log('message was from extension');
        return;
    }

    if(request.status === 'error') {
        console.log('Failed to take snapshot', request.message);
    }

    console.log(sender.tab.url);
    console.log(request.html);
    console.log(request.screenshot);
});

