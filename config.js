module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 8080,
    URL : process.env.BASE_URL || 'http://localhost:8080',
    MONGODB_URI: process.env.MONDOGB_URI || "mongodb://admin:ADATAtotal0@ds157654.mlab.com:57654/customer_api",
    JWT_SECRET: process.env.JWT_SECRET || "supersecretkey"
}