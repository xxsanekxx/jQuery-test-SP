module.exports = {
    debug: {
        options: {
            style: 'compressed'
        },
        files: [{
            expand: true,
            cwd: 'build/scss/',
            src: ['**/*.scss', '!_*.scss'],
            dest: "<%= destPath %>/css/",
            ext: '.css',
            extDot: 'last'
        }]
    }
};
