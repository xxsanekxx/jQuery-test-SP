module.exports = {
    sass: ['newer:sass'],
    copy: ['newer:copy:scripts', 'newer:copy:html', 'newer:copy:all'],
    concat: ['newer:concat'],
    uglify: ['newer:uglify'],
    browserify: ['browserify']
};
