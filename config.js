const config = {
    express: {
        port: process.env.PORT || 8888
    },
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ATCWeb"
    }
}

module.exports = { config };