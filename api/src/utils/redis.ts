import config from "../../config";
import * as redis from 'redis';

//function to spin up the redis server
const redisClient:redis.RedisClientType  = redis.createClient({
    url : config.redisURL,
});

export default redisClient;