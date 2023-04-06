
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { registerRoute } = require('workbox-routing');
const { StaleWhileRevalidate, CacheFirst } = 'workbox-strategies';
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new workbox.expiration.ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


// Register pageCache strategy for navigations
registerRoute(
  ({ request }) => request.mode === 'navigate',
  ({ url }) => {
    if (url.pathname === '/') {
      return pageCache.match('/');
    }
    return pageCache.match(request);
  },
);

/*
//registerRoute(({ request }) => request.mode === 'navigate', pageCache);
registerRoute(({ request }) => request.mode === 'navigate');
// TODO: Implement asset caching
registerRoute();
*/