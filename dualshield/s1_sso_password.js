import { sleep, group, check } from "k6";
import {parseHTML} from "k6/html";
import http from "k6/http";

export const options = {};

export default function () {
    let res;
    res = http.get("https://dualshield6.bletchley16.com:8073/dac/app?ep=/",
        {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-dest": "document",
          },
        });
    check(res, {
    "is status 200": (r) => r.status === 200
    });  
    sleep(1);
  
    const doc = parseHTML(res.body);  // equivalent to res.html()
    const form = doc.find('form');
    const urlsso = form.attr('action');
    console.log(urlsso);
    const data = form.children();   //Selection
    let saml = new Object();
    data.each(function(idx, item){
//            console.log(item.getAttribute('name'));
        saml[item.getAttribute('name')] = item.getAttribute('value');
    });

    let headers = {'Content-Type': 'application/x-www-form-urlencoded'};

    res = http.post(urlsso, saml, {headers: headers});
  
}