import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('push', (event) => {
    // const data = event.data;
    event.waitUntil(
        self.registration.showNotification('TreeHugggers', {
            body: "Grid is clean!"
        })
    )
});