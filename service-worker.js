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
    "revision": "9c20a5e5e46e9dca907f6f6cbbbfa7fb"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "dcdbf3c4524e127112c880cd4e33214e"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.f3396affa611058e7aa05cbe0b64960b.js",
    "revision": "f3396affa611058e7aa05cbe0b64960b"
  },
  {
    "url": "static/css/main.3335147b.chunk.css",
    "revision": "e03ac2638d9cf404b9a8069a60e7618a"
  },
  {
    "url": "static/js/2.7c11df24.chunk.js",
    "revision": "7716772327436ec3a19cd1311378a4e0"
  },
  {
    "url": "static/js/main.e49414c5.chunk.js",
    "revision": "11641ab79a6042fefc16be39b5d30cd1"
  },
  {
    "url": "static/js/runtime~main.885d46d7.js",
    "revision": "6ccfcbaccf4456918b7f63037d225d81"
  }
], {});
