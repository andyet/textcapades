'use strict';
const controllers = {};

module.exports = controllers;

controllers.start = {
    description: 'Start story page',
    notes: 'Prompt for name',
    handler: (request, reply) => {

        reply.view('start');
    },
    auth: false
};

controllers.play = {
    description: 'Play textcapades',
    handler: (request, reply) => {

        reply.view('play', request.auth.credentials);
    }
};
