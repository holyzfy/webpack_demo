import $ from 'jquery';
import urlmap from './util/urlmap';
import template from './util/template';
import listTmpl from '../templates/list.html';

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
}

(typeof window === 'object') && start();