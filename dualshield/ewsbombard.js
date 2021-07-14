import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
import papaparse from './papaparse.min.js';
import { SharedArray } from "k6/data";

// Something you need to replace in your test
// 1 - Application
const domain = 'deepnetmfa';
const mailserver = 'mail.deepnetmfa.com';
const password = 'yourpassword';
// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("nanostore", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./testusers.csv'), { header: true }).data;
});

var soapReqBody = (usermail) => `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">
  <soap:Body>
    <CreateItem MessageDisposition="SendAndSaveCopy" xmlns="http://schemas.microsoft.com/exchange/services/2006/messages">
      <SavedItemFolderId>
        <t:DistinguishedFolderId Id="drafts" />
      </SavedItemFolderId>
      <Items>
        <t:Message>
          <t:ItemClass>IPM.Note</t:ItemClass>
          <t:Subject>Project Action</t:Subject>
          <t:Body BodyType="Text">Priority - Update specification</t:Body>
          <t:ToRecipients>
            <t:Mailbox>
              <t:EmailAddress>${usermail}</t:EmailAddress>
            </t:Mailbox>
          </t:ToRecipients>
          <t:IsRead>false</t:IsRead>
        </t:Message>
      </Items>
    </CreateItem>
  </soap:Body>
</soap:Envelope>
`;

export const options = {
  insecureSkipTLSVerify: true,  //ignore custom CA
  userAgent: 'nanoart/1.0',
 
  /*
// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for  
  
  Test Types: https://k6.io/docs/test-types/introduction/
  
  Suggestion
  Smoke test:
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
    
  Load test:
  
    stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  
    stages: [
    { duration: '5m', target: 60 }, // simulate ramp-up of traffic from 1 to 60 users over 5 minutes.
    { duration: '10m', target: 60 }, // stay at 60 users for 10 minutes
    { duration: '3m', target: 100 }, // ramp-up to 100 users over 3 minutes (peak hour starts)
    { duration: '2m', target: 100 }, // stay at 100 users for short amount of time (peak hour)
    { duration: '3m', target: 60 }, // ramp-down to 60 users over 3 minutes (peak hour ends)
    { duration: '10m', target: 60 }, // continue at 60 for additional 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  
  
  Stress test:
  
    stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
  
  Spike test:
  
    stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
  
  Soaking test:
  
    stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],

  */
    stages: [
    { duration: '2m', target: 200 }, // simulate ramp-up of traffic from 1 to 100 users over 2 minutes.
    { duration: '10m', target: 200 }, // stay at 200 users for 10 minutes
    { duration: '2m', target: 0 }, // ramp-down to 0 users
  ],  

  thresholds: {
    http_req_duration: ['p(95)<4000'], // 95% of requests must complete below 4.0s
  },
};

export default function () {

  // https://k6.io/docs/examples/data-parameterization/

  // Pick a random user
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
 
  var usermail = randomUser.username + "@" + domain + ".com";
  var username =  domain + '%5C' + randomUser.username ;      //down-level format 

  
  
    var credentials = `${username}:${password}`;
    var url = `https://${credentials}@${mailserver}/EWS/exchange.asmx`;
    var reqContent = soapReqBody(usermail);
    
    console.log(url);
    console.log(reqContent);
    
    let res = http.post(url, reqContent,
        { headers: { 'Content-Type': 'text/xml' }, auth: 'ntlm'},
    );  
  
  
  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
