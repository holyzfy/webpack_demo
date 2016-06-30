/* eslint-disable no-console */

import $ from 'jquery';
import urlmap from './util/urlmap';
import template from './util/template';
import listTmpl from '../templates/list.html';
import moduleA from './module_a';
import moduleB from './module_b';
import moduleC from './module_c';

export function search(elem) {
    return $(elem).length;
}
export function list() {
    $.getJSON(urlmap.list, function(data) {
        if(data.status !== 0) {
            return $('#list').html(data.message || '系统异常');
        }
        var html = template.compile(listTmpl)(data.data);
        $('#list').html(html);
    });
}

function start() {
    list();
    console.info(moduleA, moduleB, moduleC);
}

(typeof window === 'object') && start();