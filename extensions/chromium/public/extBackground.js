
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    // https://developer.chrome.com/docs/extensions/mv3/messaging/#simple

    if(!sender.tab) {
        console.log('message was from extension');
        return;
    }

    switch(request.id) {
        case 'SNAPSHOT_TAKEN': {
            if(request.status === 'ok') {
                console.log(sender.tab.url);
                console.log(request.html);
                console.log(request.screenshot);
            }
            else if(request.status === 'error') {
                console.error('Failed to take snapshot', request.message);
            }
            else {
                console.warn(`Unknown request status: ${request.status}`);
            }
            break;
        }
        case 'TAKE_SNAPSHOT': {
            await extTakeSnapshotInTab();
            break;
        }
        default: {
            console.warn(`Unknown request id: ${request.id}`);
            break;
        }
    }
});

