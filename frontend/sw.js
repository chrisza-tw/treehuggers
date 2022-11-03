import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('push', (event) => {
    const data = event.data;
    let responseMsg = "Grid is dirty!!"
    
    if (data.body === "false"){
        responseMsg = "Grid is clean!!"
    }

    console.log(data);
    event.waitUntil(
        self.registration.showNotification('TreeHugggers', {
            body: responseMsg
        })
    )
});