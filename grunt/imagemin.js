module.exports = {
    dynamic: {
        options: {
            optimizationLevel: 4
        },
        files: [
            {
                expand: true,
                cwd: "build/img/",
                src: ["**/*.{png,jpg,gif}", "!icons"],
                dest: "<%= destPath %>/img/"
            }
        ]
    }
};
