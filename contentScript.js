const text = []
const aTags = document.getElementsByTagName("a")
for (const tag of aTags) {
    text.push(tag.textContent)
}

chrome.storage.local.set({
    text,
})

chrome.runtime.sendMessage(null, text, (response) => {
    console.log("I'm from the send response function: " + response)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
})
