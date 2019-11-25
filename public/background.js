/*global chrome*/
let setting = {};

chrome.browserAction.onClicked.addListener(function (tab) {

});

chrome.runtime.onStartup.addListener(function () {
	setSeting();
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	chrome.storage.sync.set(request);
// 	setting = request;
// 	sendResponse(true);
// });

chrome.storage.onChanged.addListener(function (changes, namespace) {
	setSeting();
});

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {

	const url = details.initiator;
	if (url == null) {
		return;
	}

	if (!setting.cookieName || !setting.cookieValue) {
		return;
	}

	if (setting.isOpenScene) {
		addCookie(url, setting.cookieName, setting.cookieValue);
	} else {
		deleteCookie(url, setting.cookieName);
	}



}, { urls: ["<all_urls>"] }, ["blocking"]);

const addCookie = (url, name, value) => {

	chrome.cookies.get({ url: url, name: name }, function (cookie) {

		if (cookie === null) {

			chrome.cookies.set({ url: url, name: name, value: value }, function () {
				console.log("修改cookie失败");
			});
		}
	});
}

const deleteCookie = (url, name) => {

	chrome.cookies.remove({ url: url, name: name }, function () {
		console.log("删除cookie失败");
	});
}

const setSeting = function () {
	chrome.storage.sync.get(['isOpenScene', 'cookieValue'], (result) => {
		setting.isOpenScene = result.isOpenScene;
		setting.cookieName = "_duibaServiceGroupKey";
		setting.cookieValue = result.cookieValue;
	});
}
