import test from 'ava';
import proxyquire from 'proxyquire';

test('search', t => {
    var document = require('jsdom').jsdom('<div class="item"></div><div>aaa</div><p>test</p><div class="item"></div>');
    var window = document.defaultView;
    var list = proxyquire('../js/list.js', {
        jquery: require('jquery')(window)
    });
    var length = list.search('div.item');
    t.is(length, 2);
});