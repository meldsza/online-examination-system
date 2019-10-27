const serverAPI = require('./server/index')

module.exports = {
    devServer: {
        before: serverAPI.initializeServer,
    }
}