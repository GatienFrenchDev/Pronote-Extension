chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    console.log(msg.data)
    chrome.tabs.create({url: `rendu.html?d=${encodeURIComponent(JSON.stringify(msg.data))}&i=${encodeURIComponent(JSON.stringify(msg.infos))}`});
    sendResponse(200)
})