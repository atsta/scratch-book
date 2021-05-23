
let btn1 = document.getElementsByTagName("button")[0];

btn1.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        function: window.ExtSelect,
    });
});

