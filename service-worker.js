/**
 * Welcome to your Workbox-powered service worker!
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

console.log('I know it\'s me because who else would say this.');


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  console.log('I\'m a service worker and I saw a fetch!');
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "a636d538b976488b16af60ee06c84f48"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "e69717ad3e79e73c9ce6f0e3fc7db95b"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.c0370389296d7a0ed25c48b126f44d00.js",
    "revision": "c0370389296d7a0ed25c48b126f44d00"
  },
  {
    "url": "static/css/main.3335147b.chunk.css",
    "revision": "e03ac2638d9cf404b9a8069a60e7618a"
  },
  {
    "url": "static/js/2.8cc2d9eb.chunk.js",
    "revision": "03d8876c7e1c1d395f306b493b7aff4b"
  },
  {
    "url": "static/js/main.fdb89c4c.chunk.js",
    "revision": "2f0d31a0d212411d72001eaeb1a0ffc7"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
], {});
