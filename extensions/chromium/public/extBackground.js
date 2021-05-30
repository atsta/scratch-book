
const BACKEND_ORIGIN = 'http://localhost:3000'

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    // https://developer.chrome.com/docs/extensions/mv3/messaging/#simple

    if(!sender.tab) {
        console.log('message was from extension');
        return;
    }

    switch(request.id) {
        case 'SNAPSHOT_TAKEN': {
            if(request.status === 'ok') {
                // console.log(sender.tab.url);
                // console.log(request.html);
                // console.log(request.screenshot);

                chrome.storage.local.get(['active_board_id', 'auth_token'], function(result) {
                    const formData = new FormData();
                    formData.set('url', sender.tab.url);
                    formData.set('html', request.html);
                    formData.set('screenshot', request.screenshot);
                    return fetch(`${BACKEND_ORIGIN}/api/urls/${result.active_board_id}`, {
                        method: 'post',
                        mode: 'cors',
                        headers: new Headers({
                            'Content-Type': 'application/json; charset=utf-8',
                            'auth-token': result.auth_token,
                        }),
                        body: JSON.stringify(Object.fromEntries(formData)),
                    });
                });
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

