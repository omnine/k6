# DAC create SAML request (about 50 req/s)
```
E:\work\k6\dualshield>k6 run s1_sso_password.js -u 50 -d 50s

          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

  execution: local-
     script: s1_sso_password.js
     output: -

  scenarios: (100.00%) 1 executors, 50 max VUs, 1m20s max duration (incl. graceful stop):
           * default: 50 looping VUs for 50s (gracefulStop: 30s)

I
running (0m51.0s), 00/50 VUs, 2464 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  50s0


    ✓ is status 200

    checks.....................: 100.00% ✓ 2464 ✗ 0
    data_received..............: 13 MB   250 kB/s
    data_sent..................: 1.1 MB  22 kB/s
    http_req_blocked...........: avg=3.96ms   min=0s     med=0s     max=255.78ms p(90)=0s      p(95)=0s
    http_req_connecting........: avg=44.62µs  min=0s     med=0s     max=2.99ms   p(90)=0s      p(95)=0s
    http_req_duration..........: avg=17.69ms  min=5.99ms med=7.99ms max=280.9ms  p(90)=36.98ms p(95)=57.98ms
    http_req_receiving.........: avg=133.03µs min=0s     med=0s     max=20.99ms  p(90)=997.2µs p(95)=999.7µs
    http_req_sending...........: avg=812ns    min=0s     med=0s     max=1ms      p(90)=0s      p(95)=0s
    http_req_tls_handshaking...: avg=3.87ms   min=0s     med=0s     max=250.78ms p(90)=0s      p(95)=0s
    http_req_waiting...........: avg=17.56ms  min=5.99ms med=7.99ms max=280.9ms  p(90)=36.98ms p(95)=57.98ms
    http_reqs..................: 2464    48.293546/s
    iteration_duration.........: avg=1.02s    min=1s     med=1s     max=1.41s    p(90)=1.03s   p(95)=1.05s
    iterations.................: 2464    48.293546/s
    vus........................: 0       min=0  max=50
    vus_max....................: 50      min=50 max=50

```