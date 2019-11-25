/*global chrome*/

chrome.storage.sync.get(['isOpenScene', 'cookieName', 'cookieValue'], (result) => {
    let newDiv = document.createElement("div");
    newDiv.id = "duiba_scenes_ext";
    newDiv.innerHTML = JSON.stringify(result);
    newDiv.style.display = "none";
    document.body.appendChild(newDiv);
});

//var port = chrome.runtime.connect();
window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source !== window)
        return;

    if (event.data.type && (event.data.type === "COOKIE_MODIFY")) {
        chrome.storage.sync.set({ 'isOpenScene': true, 'cookieName': '_duibaServiceGroupKey', 'cookieValue': event.data.value });
    }

    if (event.data.type && (event.data.type === "COOKIE_INVALID")) {
        chrome.storage.sync.set({ 'isOpenScene': false });
    }

}, false);