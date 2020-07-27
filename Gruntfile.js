module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    "sftp-deploy": {
      build: {
        auth: {
          host: "bandpadtest.com",
          port: 22,
          authKey: "privateKey"
        },
        cache: false,
        src: "./dist/spa",
        dest: "bandpad-payments",
        exclusions: ["/dist/**/.DS_Store", "/dist/**/Thumbs.db"],
        serverSep: "/",
        localSep: "/"
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-sftp-deploy");

  // Default task(s).
  grunt.registerTask("deploy", ["sftp-deploy"]);
};
