## Simple Test 
*k6 run script.js*

## Debug
*k6 run script.js --http-debug="full"*

## Load Test
*k6 run -u 10 -d 30s script.js*

## DualShield Docker
It is hard the keep the same folder structure in docker. we use [docker-compose](https://stackoverflow.com/questions/29480099/docker-compose-vs-dockerfile-which-is-better) to run multiple containers.

## poolperf

The Javalin API server and K6 script to check the relationship between thread pool and rps (and response time), the Little's Law.

