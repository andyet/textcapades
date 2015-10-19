'use strict';
const internals = {};
const Main = require('./controllers/main'); //Main site pages
const Story = require('./controllers/story'); //Story pages
const Hoek = require('hoek');
const Path = require('path');

exports.register = (plugin, options, done) => {

    plugin.register([{
        register: require('inert')
    }, {
        register: require('vision')
    }], err => {

        Hoek.assert(!err, 'Failed loading plugins: ' + err);
        plugin.views({
            engines: { jade: require('jade') },
            path: Path.join(__dirname,  'templates'),
            isCached: options.isCached
        });

        //Assets
        plugin.route({ method: 'GET', path: '/{param*}', config: Main.assets });

        //Pages
        plugin.route({ method: 'GET', path: '/', config: Main.index });
        plugin.route({ method: 'GET', path: '/story', config: Story.start });
        plugin.route({ method: 'GET', path: '/story/play', config: Story.play });
        done();
    });
};

exports.register.attributes = {
    name: 'textcapades-web',
    version: '1.0.0'
};
