module.exports = {
    dist: {
        options: {
            sourceMap: true,
            transform: [["babelify", {presets: ["es2015"]}]]
        },
        files: [{
            expand: true,
            cwd: "build/js/",
            src: ["**/*.js"],
            dest: "<%= destPath %>/js/"
        }]
    }
};
