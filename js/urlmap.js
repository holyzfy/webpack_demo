var devMap = {
    list: 'mock/list.json'
};

var productionMap = {
    list: '/api/list'
};

export function getEnv() {
    var devList = ['localhost'];
    var isLocal = devList.indexOf(window.location.hostname) > -1;
    return isLocal ? 'development' : 'production';
}

export default getEnv() === 'development' ? devMap : productionMap;