var colors = require('colors');

var arguments = process.argv.slice(2);
var pattern = /^[a-z0-9_\-./]+$/;
var valid = true;

arguments.forEach(function(filepath) {
    if(!pattern.test(filepath)) {
        valid = false;
        console.error(colors.red(filepath));
    }
});

if(!valid) {
    console.error(colors.yellow('请检查以上列出的文件（约定文件和目录由小写字母、数字、下划线_组成）'));
    process.exit(1);
}
