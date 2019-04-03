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
    "revision": "e8845f4680431aa5d439a4d7f97ff0b0"
  },
  {
    "url": "favicon.ico",
    "revision": "3adfcb31f6c9140de7e1e8941b316d7c"
  },
  {
    "url": "index.html",
    "revision": "f59053f18e49af29a90bfbec12fdb333"
  },
  {
    "url": "manifest.json",
    "revision": "57e25bc1066b9aa1654e23059bfa8096"
  },
  {
    "url": "precache-manifest.fede80cb65d831ec2f1f5ef301785978.js",
    "revision": "fede80cb65d831ec2f1f5ef301785978"
  },
  {
    "url": "static/css/main.3335147b.chunk.css",
    "revision": "e03ac2638d9cf404b9a8069a60e7618a"
  },
  {
    "url": "static/js/main.8c56c9c4.chunk.js",
    "revision": "bf8a64c5036341be3f7023f9b572b0e2"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
], {});
