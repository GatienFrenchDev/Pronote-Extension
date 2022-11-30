chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    chrome.tabs.create({url: `html/notes.html?d=${encodeURIComponent(JSON.stringify(msg.data))}&i=${encodeURIComponent(JSON.stringify(msg.infos))}`});
    sendResponse(200)
})