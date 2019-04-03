module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,ico,html,js,css,svg}"
  ],
  "swDest": "build/service-worker.js",
  "swSrc": "sw.js",
  "maximumFileSizeToCacheInBytes": 4 * 1024 * 1024,
};
