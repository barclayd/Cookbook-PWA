if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(reg => {
      messaging.useServiceWorker(reg);
      console.log('registered service worker', reg);
    })
    .catch(err => {
      console.log('service worker not registered', err);
    });
}

firebase.messaging().onMessage(notification => {
  console.log('Notification received!', notification);
  alert(notification.data.body);
});