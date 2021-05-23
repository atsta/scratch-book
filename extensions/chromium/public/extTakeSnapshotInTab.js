
async function extTakeSnapshotInTab() {

    let [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        function: extTakeSnapshot,
    });
}

