module.exports = {

  js: {

    compile: {
      src: ["./src/assets/js/*.js"]
    },

    hint: {
      src: ["./src/assets/js/*.js"],
      jshintrc: "./config/jshintrc.json"
    },

    build: "./dist/js",
    dist: "./dist/js"

  },

  scss: {

    lint: {},
    src: ["./src/assets/css/*.scss"],
    build: "./dist/css",
    dist: "./dist/css"

  }

};
