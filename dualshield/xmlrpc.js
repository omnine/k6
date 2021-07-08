import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
import papaparse from './papaparse.min.js';
import { SharedArray } from "k6/data";


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
    //In reality, the test users should be exported from AD  to a CSV file, then K6 read it
    
    
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.
  // the csv should contain username, deviceId,

  // Loop through all username/password pairs
  for (var userPwdPair of csvData) {
    console.log(JSON.stringify(userPwdPair));
  }

  // Pick a random username/password pair
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  // add random type
  console.log('Random user: ', JSON.stringify(randomUser));

  let params = {
    application:
    {
       name:"iis"   // replace with the actual name 
    },
    user:
    {
         loginName: randomUser.username //"james.zeng@bletchley16.com"
    },
    credential:
    {
         method:"MOBDNA",
         devicePrint:randomUser.deviceId,
         userAgent:"ua",
         os:"Windows"
    },
    remoteIp:"127.0.0.1",
    requireSession:false,
    procedureType:"ACTIVE_SYNC",    //what should it be?
    callingServer:"k6",             //need to match IIS server?
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
  });
}
