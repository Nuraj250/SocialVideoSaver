document.getElementById('fetchBtn').addEventListener('click', () => {
  const videoUrl = document.getElementById('videoUrl').value;
  if (!videoUrl) {
      alert("Please enter a video URL!");
      return;
  }

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('previewContainer').classList.add('hidden');
  document.getElementById('status').innerText = "";

  chrome.runtime.sendMessage({ action: "fetchVideoInfo", url: videoUrl }, response => {
      document.getElementById('loading').classList.add('hidden');

      if (response?.videoDetails) {
          document.getElementById('videoThumbnail').src = response.videoDetails.thumbnail;
          let formatSelect = document.getElementById('formatSelect');

          formatSelect.innerHTML = "";
          response.videoDetails.formats.forEach(format => {
              let option = document.createElement("option");
              option.value = format;
              option.textContent = format.toUpperCase();
              formatSelect.appendChild(option);
          });

          document.getElementById('previewContainer').classList.remove('hidden');
      } else {
          alert("Error fetching video details. Try another link.");
      }
  });
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const videoUrl = document.getElementById('videoUrl').value;
  const selectedFormat = document.getElementById('formatSelect').value;

  chrome.runtime.sendMessage({ action: "fetchDownloadLink", url: videoUrl, format: selectedFormat }, response => {
      if (response?.downloadUrl) {
          document.getElementById('status').innerText = "Downloading...";
          chrome.downloads.download({ url: response.downloadUrl });
          document.getElementById('status').innerText = "Download started!";
      } else {
          alert("Error fetching download link.");
      }
  });
});
