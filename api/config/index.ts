const settings = {
    port: process.env.PORT || 3001,
    db: process.env.DB_URL || "mongodb://drex:drex@mongo_container:27017/rufio?authSource=admin",
    redisURL :"redis://redis_container:6379",
    redisPass : process.env.REDIS_PASS,   
    expiration: 1000 * 60 * 60 * 48, 
}

export default settings;