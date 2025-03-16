
    // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js

    /*
      Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
      while also being easily customizeable. You can add in your own code to implement the capabilities
      listed below, or change anything else you would like.


      Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
      Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

      Did you know that Service Workers offer many more capabilities than just offline? 
        - Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
        - Periodic Background Sync: https://web.dev/periodic-background-sync/
        - Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
        - Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
    */

        // once pages are cached, they'll never get updated. Update the cacheName to force
        // a reload of all pages. These are the different urls and need to exist.
        // All listed assets must exist and not return a 404. '/' is the same as root index.html 
        // and both should be included.
        const cacheName = "offlineCacheV5";
        const cacheAssets = [
            "index.html",
            "AppwriteStuff.js",
            "script.js",
            "styles.css",
            "manifest.json",
            "service-worker.js",
            "ico.png",
            "match-data.js",
            "dashboard/dashboard-appwrite.js",
            "dashboard/dashboard.css",
            "dashboard/index.html",
            "gamble/betHandler.js",
            "gamble/index.html",
            "gamble/script.js",
            "gamble/gamble.css",
            "login/index.html",
            "login/login-appwrite.js",
            "login/login-helper.js",
            "qr/index.html",
            "qr/script.js",
            "qr/style.css",
            "record/index.html",
            "record/script.js",
            "scan/index.html",
            "scan/script.js",
            "scout/index.html",
            "scout/scout.css",
            "scout/Untitled drawing.png",
            "scout/script.js",
            "signup/index.html",
            "signup/signup-appwrite.js",
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
            "https://cdn.jsdelivr.net/npm/appwrite@17.0.0"
        ];

        self.addEventListener('install', e => {
            console.log('Service Worker: Installed');
        
            e.waitUntil(
                (async () => {
                    try {
                        const cache = await caches.open(cacheName);
                        await cache.addAll(cacheAssets);
                    } catch (error) {
                        console.log(error.message);
                    }
                })(),
            );
        });

    /**
     *  @Lifecycle Activate
     *  New one activated when old isnt being used.
     *
     *  waitUntil(): activating ====> activated
     */
    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim())
    })

    self.addEventListener("fetch", (e) => {
        e.respondWith(
            // defining async so we can use await in try..catch on promise 
            // instead of .then(..).catch(..)
            (async () => {
                try {
                    // try to retreive first - if offline, will throw an error
                    return await fetch(e.request);
                } catch (error) {
                    // see if we have a cached resource and serve it up
                    const cachedResponse = await caches.match(e.request);
                    if (cachedResponse) {
                        console.log(`cached: ${cachedResponse.url}`);
                        return cachedResponse;
                    }
                    console.log(`uncached: ${e.request.url}`);
                    throw error;
                }
            })()
        );
    });
    