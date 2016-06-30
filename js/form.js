/* eslint-disable no-console */

import urlmap from './util/urlmap';
import { page } from './admin/index';

function start() {
    console.info('page=', page);
    console.info('urlmap=', urlmap);

    require(['./module_a', './module_b'], function async(moduleA, moduleB) {
        console.info(moduleA, moduleB);
    });
}

(typeof window === 'object') && start();