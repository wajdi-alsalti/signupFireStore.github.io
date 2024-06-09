self.addEventListener("push", (event) => {
    const notif = event.data.json().notification;
    event.waitUntil(self.registration.showNotification(notif.title, {
        body: notif.body,
        icon: notif.image,
        data: {
            // url: notif.click_action,
             url: "https://example.co.il/gizmos",
             //deeplink: "https://example.co.il/gizmos"
        }
    }));

});

// self.addEventListener("notificationclick", (event) => {
//     const deepLinkUrl = event.notification.data.deeplink;
//     event.notification.close();
//     window.location.href = deepLinkUrl;
// });

// Handle notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
    });

// self.addEventListener("notificationclick", (event) => {
//     event.waitUntil(clients.openWindow(event.notification.data.deeplink));
// });
