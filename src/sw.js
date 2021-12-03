import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

 if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
            for(let registration of registrations) {
                registration.unregister();
            }
        });
}

registerRoute(
    /\/api\/.*/,
    new StaleWhileRevalidate(),
    'GET'
);

setupRouting();
setupPrecaching(getFiles());
