import { sleep, group } from "k6";
import http from "k6/http";

export const options = {};

export default function () {
  let response;
  response = http.get("https://dualshield6.bletchley16.com:8073/dac/app?ep=/",
        {
          headers: {
            "upgrade-insecure-requests": "1",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/dac/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
          },
        });
  sleep(1);
}