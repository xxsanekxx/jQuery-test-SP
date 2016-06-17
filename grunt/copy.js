module.exports = {
    scripts: {
        files: [
            // jquery
            {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: ['**/*'],
                dest: '<%= destPath %>/js/'
            },
            // bootstrap
            {
                expand: true,
                cwd: 'node_modules/bootstrap-sass/assets/fonts/',
                src: ['**/*'],
                dest: '<%= destPath %>/fonts/'
            },
            {
                expand: true,
                cwd: 'node_modules/bootstrap-sass/assets/javascripts/',
                src: ['**/*'],
                dest: '<%= destPath %>/js/'
            }
        ]
    },
    html: {
        files: [
            {
                expand: true,
                cwd: 'build/',
                src: ['**/*.html'],
                dest: '<%= destPath %>/'
            }
        ]
    },
    all: {
        files: [
            {
                expand: true,
                cwd: 'build/',
                src: ['*', '!*.html', '!scss', '!js'],
                dest: '<%= destPath %>/'
            }
        ]
    }
};
