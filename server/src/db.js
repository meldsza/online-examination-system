const { DataSource } = require("apollo-datasource");
const { InMemoryLRUCache } = require("apollo-server-caching");

class DB extends DataSource {
    constructor() {
        super();
        this.Student = require('../models/Student')
        this.Faculty = require('../models/Faculty')
        this.Administrator = require('../models/Administrator')
        this.Group = require('../models/Group')
        this.Course = require('../models/Course')
        this.Attempt = require('../models/Attempt')
        this.Answer = require('../models/Answer')
        this.Test = require('../models/Test')
        this.Question = require('../models/Question')
        this.AppSetting = require('../models/AppSetting')
        this.Permission = require('../models/Permission')
        this.PasswordReset = require('../models/PasswordReset')
    }
    initialize(config) {
        this.context = config.context;
        this.cache = config.cache || new InMemoryLRUCache();
    }
}

module.exports = new DB();
