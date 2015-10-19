'use strict';
const Path = require('path');
const controllers = {};

module.exports = controllers;

controllers.assets = {
    description: 'Assets',
    files: {
        relativeTo: Path.resolve(__dirname, '..')
    },
    handler: {
        directory: {
            path: 'public',
            index: false
        }
    },
    auth: false
};

controllers.index = {
    description: 'Main page',
    handler: (request, reply) => {

        reply.view('index');
    },
    auth: false
};
