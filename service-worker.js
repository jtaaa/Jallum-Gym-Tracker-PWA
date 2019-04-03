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
    "revision": "bc734f69fa2ff36b5029475c70a4ed53"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "1c979a9d0ce006d51e7e27a7723e39da"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.dfe9518156b38df3fc78927cb2cbcd14.js",
    "revision": "dfe9518156b38df3fc78927cb2cbcd14"
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
    "url": "static/js/main.16150a69.chunk.js",
    "revision": "f22ced0f888bf264a6f136535483bd81"
  },
  {
    "url": "static/js/runtime~main.885d46d7.js",
    "revision": "6ccfcbaccf4456918b7f63037d225d81"
  }
], {});
