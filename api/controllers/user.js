'use strict';
const Joi = require('joi');

const controllers = {};

module.exports = controllers;

controllers.create = {
    description: 'Create new user and start them playing',
    notes: 'Overwrites any current session user',
    handler: (request, reply) => {

        const response = this.engine.createUser(request.payload)
        .then((user) => {

            return this.engine.attemptAdvance(user);
        }).then((user) => {

            request.auth.session.set(user);
            return request.generateResponse().redirect('/story/play');
        });

        reply(response);

    },
    validate: {
        payload: {
            name: Joi.string().required()
        }
    },
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    }
};
