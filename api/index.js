'use strict';
const internals = {};
const User = require('./controllers/user');
exports.register = (plugin, options, done) => {

    plugin.bind({ engine: options.engine });

    plugin.route({ method: 'POST', path: '/user', config: User.create });

    done();
};

exports.register.attributes = {
    name: 'textcapades-api',
    version: '1.0.0'
};

