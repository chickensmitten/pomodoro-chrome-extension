# Google Chrome Extension Tutorial
## Getting started
- Create "manifest.json" file.
- Input the JSON content. Refer to chrome developer's manifest
- "chrome://extensions", turn on "developer mode", go to "load unpacked", then select the folder and unpack it.

## Pop up aka homepage for the popup
- In the manifest, there is "default_popup" in "actions". It can be used to open .html files. It is sort of like a home page. It acts like a pop up in the chrome extension.
- Then in the .html file, load from a .js file to see changes happening.

## Options page
- When using "options_page" in the manifest, Users can click on the html to go to a web page.

## Storing session data
- Use chrome.storage API
- need permission in manifest with `"permissions": ["storage]`
- `chrome.storage.sync` will sync all chrome storage data across different sessions
- `chrome.storage.local` will be local to a sync session.
- in general, we use `.sync`

## Running jobs in the background
- Use "background" field
```
"background": {
  "service_worker": "background.js"
}
```

## Alert with Alarm
- Need to get "alarms" permission in chrome.alarms
- Setting the badge in chrome extension. this will change the badge in the chrome extension
```
chrome.action.setBadgeText({text: `${time + 1}`})
```

## Chrome Notifications
- need to set permissions 
- for `chrome.notification`, use `this.registration.showNotification("text", {body: "something", icon: "image.png"})`, this will create a pop up notification in chrome


## Chrome Dev Tool
- inspect the options html with inspec
- inspect background by clicking "service worker" in "chrome://extensions"
- inspect the pop up, then you can see the dev tool console too
