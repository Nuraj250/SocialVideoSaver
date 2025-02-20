document.getElementById('saveBtn').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({ rapidApiKey: apiKey }, () => {
        document.getElementById('status').innerText = "API Key Saved!";
    });
});
