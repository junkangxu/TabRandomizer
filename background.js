async function randomize() {
    const tabs = await chrome.tabs.query({
        currentWindow: true
    });

    const tab = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    })

    const randomIndices = [...Array(tabs.length).keys()].filter(index => index != tab.index);
    const randomIndex = randomIndices[Math.floor(Math.random() * randomIndices.length)];

    await chrome.tabs.update(tabs[randomIndex].id, { active: true });
    await chrome.windows.update(tabs[randomIndex].windowId, { focused: true });
}

/**
 * Chrome extensions listener. Triggers the function whenever the extension button is clicked.
 */
chrome.action.onClicked.addListener(async tab => {
    await randomize();
});
