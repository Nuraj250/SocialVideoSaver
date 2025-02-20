chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const rapidApiKey = data.rapidApiKey || "YOUR_DEFAULT_API_KEY";

  if (message.action === "fetchVideoInfo") {
      const videoUrl = message.url;

      try {
          const response = await fetch("https://social-download-all-in-one.p.rapidapi.com/social-media", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
                  "X-RapidAPI-Key": rapidApiKey,
                  "X-RapidAPI-Host": "social-download-all-in-one.p.rapidapi.com"
              },
              body: JSON.stringify({ url: videoUrl })
          });

          const data = await response.json();
          if (data?.links?.length > 0) {
              let formats = [...new Set(data.links.map(link => link.format))];
              let videoThumbnail = data.thumbnail || "";

              sendResponse({ videoDetails: { formats, thumbnail: videoThumbnail } });
          } else {
              sendResponse({ error: "No video details found" });
          }
      } catch (error) {
          console.error("API Error:", error);
          sendResponse({ error: "API request failed" });
      }
  }

  if (message.action === "fetchDownloadLink") {
      const videoUrl = message.url;
      const selectedFormat = message.format;

      try {
          const response = await fetch("https://social-download-all-in-one.p.rapidapi.com/social-media", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
                  "X-RapidAPI-Key": rapidApiKey,
                  "X-RapidAPI-Host": "social-download-all-in-one.p.rapidapi.com"
              },
              body: JSON.stringify({ url: videoUrl })
          });

          const data = await response.json();
          let selectedVideo = data.links.find(link => link.format === selectedFormat);
          if (selectedVideo) {
              sendResponse({ downloadUrl: selectedVideo.url });
          } else {
              sendResponse({ error: "No downloadable video found" });
          }
      } catch (error) {
          console.error("API Error:", error);
          sendResponse({ error: "API request failed" });
      }
  }

  return true;
});
