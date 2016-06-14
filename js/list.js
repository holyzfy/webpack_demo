import $ from 'jquery';

export function search(elem) {
    return $(elem).length;
}

console.info($.fn.jquery); // eslint-disable-line no-console