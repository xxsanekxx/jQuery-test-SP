module.exports = {
    gruntfile: {
        files: ['Gruntfile.js', 'grunt/*'],
        options: {
            reload: true
        }
    },
    scripts: {
        files: ['build/js/**/*.js'],
        tasks: ['browserify'],
        options: {
            livereload: true
        }
    },
    sass: {
        files: ['build/scss/**/*.scss', 'build/scss/**/*.sass'],
        tasks: ['sass:debug'],
        options: {
            livereload: true
        }
    },
    html: {
        files: ['build/**/*.html'],
        tasks: ['newer:copy:html'],
        options: {
            livereload: true
        }
    }
};
