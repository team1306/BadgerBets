
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
        const cacheName = "offlineCacheV2";
        const cacheAssets = [
            "index.html",
            // "/AppwriteStuff.js",
            // "/script.js",
            // "/styles.css",
            // "/manifest.json",
            // "/service-worker.js",
            // "/ico.png",
            // "/dashboard/dashboard-appwrite.js",
            // "/dashboard/dashboard.css",
            // "/dashboard/index.html",
            // "/gamble/index.html",
            // "/gamble/script.js",
            // "/gamble/gamble.css",
            // "/login/index.html",
            // "/login/login-appwrite.js",
            // "/login/login-helper.js",
            // "/qr/index.html",
            // "/qr/script.js",
            // "/qr/style.css",
            // "/scan/index.html",
            // "/scan/script.js",
            // "/scout/index.html",
            // "/scout/scout.css",
            // "/scout/script.js",
            // "/signup/index.html",
            // "/signup/signup-appwrite.js"            
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
                    // this will filter out any GET that has a page in the
                    // cache and returning it. Any other fetch call (GET/POST/PUT)
                    // will then use fetch to execute request
                    const cachedResponse = await caches.match(e.request);
                    if (cachedResponse) {
                        return cachedResponse;
                    }
        
                    // if reponse isn't cached, use fetch
                    return fetch(e.request);
                } catch(error) {
                    console.log(error);
                }
            })()
        );
    });
    