const mongoClient= require('mongodb').MongoClient
const options = require('./db_options');
const dbPath = options.storageConfig.path
const dbName = options.storageConfig.name


exports.client = mongoClient.connect(dbPath, {useUnifiedTopology: true}).then((client) => {
        return client.db(dbName)
})
