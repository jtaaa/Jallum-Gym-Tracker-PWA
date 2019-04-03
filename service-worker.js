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
    "revision": "c67c94cf7bae4fa7a6aa1c411e87a444"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "faaa8e169747ad24ba01aa38586f31e4"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.1c705589b259b1504051681fd3ea8e06.js",
    "revision": "1c705589b259b1504051681fd3ea8e06"
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
    "url": "static/js/main.44a223e8.chunk.js",
    "revision": "6d977a3114b244270fc975502eed59d0"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
], {});
