self.addEventListener("push", (event) => {
    const notif = event.data.json().notification;
    event.waitUntil(self.registration.showNotification(notif.title, {
        body: notif.body,
        icon: notif.image,
        data: {
            url: notif.click_action,
             deeplink: "example://gizmos"
        }
    }));

});

self.addEventListener("notificationclick", (event) => {
    const deepLinkUrl = event.notification.data.deeplink;
    event.waitUntil(window.location.href = deepLinkUrl);
});

// self.addEventListener("notificationclick", (event) => {
//     event.waitUntil(clients.openWindow(event.notification.data.url));
// });
