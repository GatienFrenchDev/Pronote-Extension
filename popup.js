document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.getSelected(null, (tab) => {
        alert('AHAHAHHA')
    })
    document.getElementById('hello').addEventListener('click', () => {
        console.log('AHHAHAHHA')
    })
})