# Google Chrome Extension Tutorial
## Getting started with Chrome Extension
- Create "manifest.json" file.
- Input the JSON content. Refer to chrome developer's manifest
- "chrome://extensions", turn on "developer mode", go to "load unpacked", then select the folder and unpack it.

### Pop up aka homepage for the popup
- In the manifest, there is "default_popup" in "actions". It can be used to open .html files. It is sort of like a home page. It acts like a pop up in the chrome extension.
- Then in the .html file, load from a .js file to see changes happening.

### Options page
- When using "options_page" in the manifest, Users can click on the html to go to a web page.

### Storing session data
- Use chrome.storage API
- need permission in manifest with `"permissions": ["storage]`
- `chrome.storage.sync` will sync all chrome storage data across different sessions
- `chrome.storage.local` will be local to a sync session.
- in general, we use `.sync`

### Running jobs in the background
- Use "background" field
```
"background": {
  "service_worker": "background.js"
}
```

### Alert with Alarm
- Need to get "alarms" permission in chrome.alarms
- Setting the badge in chrome extension. this will change the badge in the chrome extension
- Can change badge text.
- Can use `chrome.alarm` to change badge periodically
```
chrome.action.setBadgeText({text: `${time + 1}`})
```

### Chrome Notifications
- need to set permissions 
- for `chrome.notification`, use `this.registration.showNotification("text", {body: "something", icon: "image.png"})`, this will create a pop up notification in chrome


### Chrome Dev Tool
- inspect the options html with inspec
- inspect background by clicking "service worker" in "chrome://extensions"
- inspect the pop up, then you can see the dev tool console too


### Chrome Runtime and Context Menu API
- `chrome.runtime` it is used to get general information about the chrome extension i.e. manifest
- `chrome.runtime.onInstalled` can be used to setup default value into storage only when user installs the application 
- `chrome.runtime.onStartup` can be used to setup value when the app starts up
- `chrome.contextMenus`, when right click, a little menu that comes up are known as context menus. it can be altered with this method. it can also be configured to show in specific types like when you are in a web page or when you are selecting a text. Permissions must be given with `contextMenus`
- you can also create parent contextMenu for parent context menu with `parentId: "contextMenu1";`
![Parent and Children context menu](/public/context_menu_parent_children.png)
- `chrome.search` a quick way to select/highlight then search for a text. Permissions must be given with `search` and `tabs`. Example: `"permissions": ["contextMenus", "search", "tabs", "storage", "tts"],`
```
chrome.search.query({
  disposition: "NEW_TAB",
  text: `imdb ${event.selectionText}`,
})
```
- `chrome.tabs` returns an array of tabs in the current browser. 
- it has also other functions like getting the current active tab with `tab[0].id` or opening new tabs with specific actions
```
chrome.tabs.create({
  url: `https://someURL.com/${event.selectionText}`,
})
```
- `tts` is text to speech
```
chrome.tts.speak(event.selectionText, {
  lang: "zh-CN",
  rate: 1,
})
```

### Content Scripts
- A JS or CSS file that is loaded into webpages that user vists that is defined in your manifest file.
- For example, when use visits a website, do something with a JS or CSS file. 
- URL patterns can match all pattern with `matches` as `"matches": ["<all_urls>"]` or only one url with the URL link directly.
```
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "css": ["contentScript.css"],
      "js": ["contentScript.js"]
    }
  ]
```
- Can also use `exclude_matches` as `"exclude_matches": ["https://www.google.com/*"],` to ignore certain URL from using the JS file.
- The JS file can do many things, including changing text or background colours etc.

### Sending and receiving messages with Content Scripts
- When `chrome.runtime.sendMessage` is called in content scripts, then somewhere either in background, can listen in to the message `chrome.runtime.onMessage`

```
chrome.runtime.sendMessage(null, text, (response) => {
    console.log("I'm from the send response function: " + response)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
})
```
- in background, receive the message with `addListener` then send a response with `chrome.tabs.sendMessage()`
```
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.tabs.sendMessage(sender.tabs.id, "Got your message from background")
})
```

### Data Fetching through API request
- Fetch data with `fetch`
- Example code below is to fetch the data then save it in local storage
```
  // Search in [TV Maze](https://www.tvmaze.com/api) as a quick way to test the API
  chrome.contextMenus.onClicked.addListener((event) => {
      if (event.menuItemId === "contextMenu1") {
          fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                  chrome.storage.local.set({
                      shows: data,
                  })
              })
      } else if (event.menuItemId === "contextMenu2") {
          chrome.tts.speak(event.selectionText, {
              lang: "zh-CN",
              rate: 1,
          })
      }
  })
```

## Workflow Summary
1. Make changes to popup.js or options.js -> store data in local storage
2. Possible step: Then changes are reflected in the current HTML page. Workflow is as follows: Local Storage -> Content scripts -> Changed current JS file -> Changed HTML
3. Possible step: popup -> Local Storage -> a listener in Content Scripts -> messages -> API data fetching -> messages -> content scripts -> Changed current JS file -> Changed HTML
4. Possible step: popup -> Local Storage -> messages -> a listener in Content Scripts like `chrome.runtime.onMessage.addListener` -> Changed current JS file -> Changed HTML


## Publishing an extension to the Chrome Web Store
- Chrome developer documentation for publishing: https://developer.chrome.com/docs/webstore/register/
- Chrome Web Store dev console: https://chrome.google.com/webstore/devconsole/

### Steps
- Register and pay registration fee
- In the chrome developer dashboard, zip "dist" folder in the react app.
- Upload it into the store with "New Item"
- Edit submission details
- Edit Privacy Practices. As it requires you to justify certain permissions that you are requesting.
- Then press "Submit for review". Normally will take a few working days for them to get back to us
- Can use preview to view the chrome extension