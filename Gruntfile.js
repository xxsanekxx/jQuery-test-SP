module.exports = function(grunt) {
    "use strict";
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        data: {
            // require edit for your dest path
            destPath: 'public',
            htmlPath: 'public'
        }
    });
};
