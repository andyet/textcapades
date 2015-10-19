'use strict';
const Config = require('getconfig');
const Hapi = require('hapi');
const Hoek = require('hoek');
const server = new Hapi.Server();

const plugins = [{
    register: require('crumb'),
    options: Config.hapi.crumb
}, {
    register: require('hapi-auth-cookie')
}, {
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: Config.hapi.logEvents
        }]
    }
}];

const connection = {
    host: Config.hapi.host,
    port: Config.hapi.port,
    router: { stripTrailingSlash: true }
};

server.connection(connection);

server.register(plugins, err => {

    Hoek.assert(!err, 'Failed loading plugins: ' + err);

    server.auth.strategy('session', 'cookie', Config.hapi.auth);
    server.auth.default('session');

    server.register({
        register: require('./api'),
        options: { engine: require('./engine') }
    }, { routes: { prefix: '/api' } }, err => {

        Hoek.assert(!err, 'Failed loading api: ' + err);

        server.register({
            register: require('./web'),
            options: { isCached: Config.getconfig.env !== 'dev' }
        }, err => {

            Hoek.assert(!err, 'Failed loading web: ' + err);
            server.start(err => {

                Hoek.assert(!err, 'Failed starting server: ' + err);

                server.log(['info', 'startup'], 'Server is running on: ' + server.info.uri);
            });
        });
    });
});

/**
 * This is for testing purposes
 */
exports.getServer = () => {

    return server;
};
