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
    "revision": "b13c193bb67aa88a4c30db6ff00bbb67"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "3c67ef88b0d5f3f90d4c57543020886b"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.d894a0fe8bdd32e186514e0d3626b582.js",
    "revision": "d894a0fe8bdd32e186514e0d3626b582"
  },
  {
    "url": "static/css/main.3335147b.chunk.css",
    "revision": "e03ac2638d9cf404b9a8069a60e7618a"
  },
  {
    "url": "static/js/2.4cbc350b.chunk.js",
    "revision": "142e7b8554b5dd5742d08d09f9d3b0da"
  },
  {
    "url": "static/js/main.904d6284.chunk.js",
    "revision": "a61c66d39e8ec757c0d2b6960f30b618"
  },
  {
    "url": "static/js/runtime~main.885d46d7.js",
    "revision": "6ccfcbaccf4456918b7f63037d225d81"
  }
], {});
