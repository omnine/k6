import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
import papaparse from './papaparse.min.js';
import { SharedArray } from "k6/data";

// Something you need to replace in your test
// 1 - Application
const dsApplication = 'iis';
const requestor = 'K6';
// https://k6.io/docs/using-k6/protocols/ssl-tls/ssl-tls-client-certificates/
const CERT = `-----BEGIN CERTIFICATE-----
MIIFgTCCA2kCAQEwDQYJKoZIhvcNAQEFBQAwgYExCzAJBgNVBAYTAlNFMRcwFQYD
VQQIEw5TdG9ja2hvbG1zIExhbjESMBAGA1UEBxMJU3RvY2tob2xtMRcwFQYDVQQK
...
/n5QrTGhP51P9Q1THzRfn6cNCDwzSTMVEJr40QhuTJQWASe3miuFmZoG5ykmGqVm
fWQRiQyM330s9vTwFy14J2Bxe4px6cyy7rVXvYL2LvfA4L0T7/x1nUULw+Mpqun1
R3XRJWqGDjBKXr5q8VatdQO1QLgr
-----END CERTIFICATE-----`;

const KEY = `-----BEGIN RSA PRIVATE KEY-----
KsZVVI1FTX+F959vqu1S02T+R1JM29PkIfJILIXapKQfb0FWrALU5xpipdPYBWp7
j5iSp06/7H8ms87Uz9BrOA6rytoRSE0/wEe5WkWdBBgLLPpfOSWZsAA5RGCB2n+N
...
Dk+frzKuiErHFN7HOHAQannui4eLsY0ehYMByowgJIUGzIJyXR6O19hVhV7Py66u
X7/Jy01JXn83LuWdpaPAKU+B42BLP0IGXt5CocPms07HOdtJ/wm2zwHTyfjn9vu+
HO/dQr6a7DhRu2lLI9Sc983NwRqDKICZQQ/+gqWk8BgQZ1yI9O4AYkzywzAEk3py
-----END RSA PRIVATE KEY-----`;


// A simple counter for http requests

export const requests = new Counter('http_reqs');

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("nanostore", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./testusers.csv'), { header: true }).data;
});


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


// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for



export const options = {
    /*
    //port 8074 doesn't need to do client certificate authentication
  tlsAuth: [
    {
      domains: ['bletchley19.com'],
      cert: CERT,
      key: KEY,
    },
  ], 
*/
  insecureSkipTLSVerify: true,  //ignore custom CA
  
  /*
  
  Test Types: https://k6.io/docs/test-types/introduction/
  
  Smoke 
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
    
  Load test
  
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
  
  
  Stress test
  
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
  
  Spike test
  
    stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
  
  Soaking test
  
    stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
  
  */
  
  stages: [
    { target: 100, duration: '5m' }
  ],
  thresholds: {
    http_req_duration: ['p(95)<2200'], // 99% of requests must complete below 2.2s
  },
};

export default function () {
 
  var url = 'https://nano190013.bletchley19.com:8074/sso/xmlrpc';
  
  // https://k6.io/docs/examples/data-parameterization/
  //In reality, the test users should be exported from AD, then save them along with their device IDs into a csv file which K6 reads from
    
  // the csv should contain username, deviceId,


  // Pick a random username
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  // add random type
  console.log('Random user: ', JSON.stringify(randomUser));

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
//  console.log('Random user: ', JSON.stringify(params));    
    
   let payload = payload1 + JSON.stringify(params) + payload3;  //raw payload
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const res = http.post(url, payload);
  
  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'methodResponse is present': (r) => r.body.indexOf('methodResponse') !== -1,
  });
}
