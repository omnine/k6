import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
import papaparse from './papaparse.min.js';
import { SharedArray } from "k6/data";

// Something you need to replace in your test
// 1 - Application
const dsApplication = 'iis';
const testURL = 'https://nano190013.bletchley19.com:8074/sso/xmlrpc';
const requestor = 'K6';



// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("nanostore", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./testusers.csv'), { header: true }).data;
});

// template strings to construct the xmlrpc request bosy
const payload1 = `<?xml version="1.0"?>
<methodCall>
   <methodName>das.jsonCall</methodName>
      <params>
         <param>
            <value><string>outlookAnywhere</string></value>
            <value><string>`;

const payload3 = `</string></value>
         </param>
      </params>
</methodCall>`;






export const options = {
  insecureSkipTLSVerify: true,  //ignore custom CA
  
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
    { duration: '3m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<4000'], // 95% of requests must complete below 4.0s
  },
};

export default function () {

  // https://k6.io/docs/examples/data-parameterization/

  // Pick a random user
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];

  let params = {
    application:
    {
       name:dsApplication   // defined at the beginning 
    },
    user:
    {
         loginName: randomUser.username // selected randomly
    },
    credential:
    {
         method:"MOBDNA",
         devicePrint:randomUser.deviceId,
         userAgent:"ua",
         os:"Windows"
    },
    remoteIp: "127.0.0.1",   //Ideally it should also be random
    requireSession:false,
    procedureType: "ACTIVE_SYNC",    //what should it be?
    callingServer: requestor,             //need to match IIS server?
    returnUserInfo:
    [
        "loginName",
        "status",
        "userPrincipalName",
        "domain.netbiosName",
        "domain.dnsName",
        "email"
    ],      
  };

    
   let payload = payload1 + JSON.stringify(params) + payload3;  //raw payload
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const res = http.post(testURL, payload);
  
  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'methodResponse is present': (r) => r.body.indexOf('methodResponse') !== -1,
  });
}
