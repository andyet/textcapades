'use strict';
const Code = require('code');
const Lab = require('lab');
const Cheerio = require('cheerio');

const lab = exports.lab = Lab.script();
const server = require('../').getServer();

lab.experiment('web', () => {

    lab.test('Link to play on home page', done => {

        const options = {
            method: 'GET', url: '/'
        };
        server.inject(options, response => {

            const $ = Cheerio.load(response.payload);

            Code.expect($('a[href="/story/play"]')).to.exist();
            done();
        });
    });
});
