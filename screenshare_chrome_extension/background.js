chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		console.log("Got request", request, sender);
		console.dir(sender.tab);
chrome.desktopCapture.chooseDesktopMedia(
  ["screen", "window"], sender.tab, function(streamId) {
            sendResponse({ mediaid: streamId});
        });
       return true; // Preserve sendResponse for future use
    }
);
