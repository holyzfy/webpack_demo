var devMap = {
    list: 'mock/list.json'
};

var productionMap = {
    list: '/api/list'
};

export function getEnv(win) {
    var devList = ['localhost'];
    var isLocal = win && devList.indexOf(win.location.hostname) > -1;
    return isLocal ? 'development' : 'production';
}

export default getEnv(global.window) === 'development' ? devMap : productionMap;