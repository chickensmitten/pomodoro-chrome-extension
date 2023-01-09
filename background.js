chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoroTimer") {
        chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
            if (res.isRunning) {
                let timer = res.timer + 1
                let isRunning = true
                if (timer === 60 * res.timeOption) {
                    this.registration.showNotification("Pomodoro Timer", {
                        body: `${res.timeOption} minutes has passed!`,
                        icon: "icon.png",
                    })
                    timer = 0
                    isRunning = false
                }
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        timeOption: "timeOption" in res ? res.timeOption : 25,
        isRunning: "isRunning" in res ? res.isRunning : false,
    })
})



// chrome.runtime.onInstalled.addListener((details) => {
//     chrome.storage.local.set({
//         shows: [],
//     })
//     chrome.contextMenus.create({
//         title: "Search TV Show",
//         id: "contextMenu1",
//         contexts: ["page", "selection"]
//     })
//     chrome.contextMenus.create({
//         title: "Read This Text",
//         id: "contextMenu2",
//         contexts: ["page", "selection"]
//     })
//     chrome.contextMenus.onClicked.addListener((event) => {
//         if (event.menuItemId === "contextMenu1") {
//             fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data)
//                     chrome.storage.local.set({
//                         shows: data,
//                     })
//                 })
//         } else if (event.menuItemId === "contextMenu2") {
//             chrome.tts.speak(event.selectionText, {
//                 lang: "zh-CN",
//                 rate: 1,
//             })
//         }
//     })
// })
