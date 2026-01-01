import ratelimit from "../config/upstash.js"

const rateLimiter = async (request, response, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) {
            return response.status(429).json({message: "Too many requests! "
                + "Please try again later."});
        }

        next();
    } catch(error) {
        console.log("Rate limit error", error); 
        next(error);
    }
}

export default rateLimiter