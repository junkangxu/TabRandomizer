const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const getCurrentTab = async () => {
    let queryOptions = { 
        active: true,
        lastFocusedWindow: true
    };

    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

const getAllTabs = async () => {
    let queryOptions = {
        currentWindow: true
    };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs;
};

const focusOnRandomTab = async () => {
    const tabs = await getAllTabs();
    const currentTab = await getCurrentTab();
    const currentTabIndex = currentTab.index;
    let newTabIndex = getRandomInt(tabs.length);    

    await chrome.tabs.update(tabs[newTabIndex].id, { active: true });
    await chrome.windows.update(tabs[newTabIndex].windowId, { focused: true });
};


const defaultRandomizerButton = document.querySelector('button');
defaultRandomizerButton.addEventListener("click", focusOnRandomTab);
