var devMap = {
    list: 'mock/list.json'
};

var productionMap = {
    list: '/api/list'
};

export function getEnv() {
    var devList = ['localhost'];
    var isLocal = ('object' === typeof location) && devList.indexOf(location.hostname) > -1;
    return isLocal ? 'development' : 'production';
}

export default getEnv() === 'development' ? devMap : productionMap;