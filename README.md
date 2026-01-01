## NodeJS :
- javascript runtime environment (allows dev to run JS code outside of browser).
- the logic/backend for javascript.

for nodejs setup & initialization:
`npm init -y`

## ExpressJS:
- a web application framework for javascript.
- simplify the process of building web applications.

for expressjs setup & initialization:
`npm install express`

---
### thing to remember:
#### Rate Limiting:
- way to control how often someone can do something on a website or app.
    - for example:
        - how many should the users refresh the page.
        - make a request to an API.
        - try to log in.
- rate limiting help with the following:
    - preventing abuse (e.g., stopping someone from making 1000 login attempts in a minute)
    - only 100 request per user every 15 minutes
- 429 http code = too many requests
#### Upstash:
    - cloud-based database service designed for serverless applications. 
    - it provides Redis and Kafka as managed services with low latency and high scalability.

    - upstash redis:
        - a serverless Redis database that supports REST APIs for easy integration.
        - ideal for caching, session management, and real-time data processing.
        
    - upstash ratelimit:
        - rate-limiting library built on Upstash Redis.
        - allows developers to control the frequency of user actions (e.g., API requests).
        - supports various algorithms like sliding window and fixed window for rate limiting.
        - helps prevent abuse, manage traffic, and ensure fair usage.

main reference: https://www.youtube.com/watch?v=F9gB5b4jgOI