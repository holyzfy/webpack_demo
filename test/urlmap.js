import test from 'ava';
import jsdom from 'jsdom';

import { getEnv } from '../js/util/urlmap';

test('env: development', t => {
    var config = {
        html: '<html></html>',
        url: 'http://localhost',
        done: function (err, window) {
            t.is(getEnv.call(window), 'development');
        }
    };
    jsdom.env(config);
});

test('env: production', t => {
    var config = {
        html: '<html></html>',
        url: 'http://test.example.com',
        done: function (err, window) {
            t.is(getEnv.call(window), 'production');
        }
    };
    jsdom.env(config);
});

