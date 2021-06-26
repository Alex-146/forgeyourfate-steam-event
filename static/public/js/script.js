/**
 * Author: https://github.com/alex-146
 * I am not responsible for your actions, you do it on own risk
 * Created 26.06.2021
 * Execute in browser console at: 
 * https://store.steampowered.com/ or https://store.steampowered.com/forgeyourfate
 */

(function() {
  class BadgeHandler {
    constructor(badge) {
      if (typeof badge === "string") {
        try {
          badge = JSON.parse(badge.replace(/'/g, "\""));
          this.badge = badge;
          this.isValid = badge.status !== "unknown";
        }
        catch(e) {
          this.isValid = false;
          alert(e.message);
        }
      }
    }

    makeRequest(genre, choice) {
      const key = "1234567890123456";
      return fetch("https://store.steampowered.com/promotion/ajaxclaimstickerforgenre", {
        "headers": {
          "content-type": `multipart/form-data; boundary=----WebKitFormBoundary${key}`
        },
        "body": `------WebKitFormBoundary${key}\r\nContent-Disposition: form-data; name=\"genre\"\r\n\r\n${genre}\r\n------WebKitFormBoundary${key}\r\nContent-Disposition: form-data; name=\"choice\"\r\n\r\n${choice}\r\n------WebKitFormBoundary${key}\r\nContent-Disposition: form-data; name=\"sessionid\"\r\n\r\n${g_sessionID}\r\n------WebKitFormBoundary${key}--\r\n`,
        "method": "POST",
      });
    }

    async makeRequestSync(genre, choice) {
      const response = await this.makeRequest(genre, choice);
      const data = await response.json();
      console.log(data);
    }

    async handleProgress() {
      const { name, verified, progress } = this.badge;
      // if (!verified) {
      //   const message = `Selected badge '${name}' is not verified, are you want to continue?`;
      //   if (!confirm(message)) return;
      // }

      const promises = progress.map(entry => this.makeRequest(entry.genre, entry.choice));
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map(response => response.json()));
      console.log(data);
    }
  }

  const handler = new BadgeHandler("{{ json }}");
  if (handler.isValid) {
    handler.handleProgress();
  }
  else {
    alert("❕ No data for this badge provided, script not executed. Stay tuned!");
  }
})();