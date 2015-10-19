'use strict';
const engine = {};
const Hoek = require('hoek');
const Decisions = require('./decisions');
const Story = require('./story');

module.exports = engine;

/**
 * This is the main function in the story engine, taking a user
 * and figuring out where they go next
 */
engine.attemptAdvance = user => {

    return new Promise((resolve, reject) => {

        if (!user.nextSeries) {
            user.nextSeries = engine.getStartSeries(user);
            user.messages = engine.getMessages(user);
        } else {
            //Parse input and assign to user attribute
            //engine.getNextSeries(user);
        }

        resolve(user);
    });

};

/**
 * Create a new user, setting any defaults they have
 */
engine.createUser = function (attrs) {

    return new Promise((resolve, reject) => {

        const user = Hoek.applyToDefaults({
            cohort: 'alpha',
            alignment: 'lachesis',
            episode: 'episode1', answers: {}
        }, attrs);

        user.first_name = user.name.split(/\s+/)[0];

        resolve(engine.attemptAdvance(user));
    });
};

engine.getStartSeries = function (user) {

    const episodeDecisions = Decisions[user.episode];
    return episodeDecisions._start(user);
};

engine.getMessages = function (user) {

    const rawMessages = Story[user.episode][user.nextSeries](user);

    //Parse out wait, p, validOptions
    return rawMessages;
};
