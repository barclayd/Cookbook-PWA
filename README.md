# Cookbook PWA

Recipe manager web app built as a full PWA. Built using vanilla JavaScript, designed using Material UI CSS with Firebase Cloud Firestore database. Hosted using Firebase.

Deployed [live](https://clear-emitter-234416.firebaseapp.com/)!

### Code style
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
    [![js-standard-style](https://img.shields.io/badge/deployed-live-blue.svg)](https://clear-emitter-234416.firebaseapp.com/)
    [![js-standard-style](https://img.shields.io/badge/deployed%20version-1.0.0-green.svg)](https://clear-emitter-234416.firebaseapp.com/)


### Demo

<p align="center">
  <img alt="PWA Walkthrough" src='https://user-images.githubusercontent.com/39765499/59162574-1bcedc00-8aeb-11e9-9d90-f844bee89db8.gif'>
  <img alt="Screenshot" src='https://user-images.githubusercontent.com/39765499/59162404-76b30400-8ae8-11e9-9f12-e8473b83fccd.png'>
  <img width=400  alt="Google Lighthouse Audit" src='https://user-images.githubusercontent.com/39765499/59162402-6864e800-8ae8-11e9-83f0-1a633d985122.png'>
</p>

### Features

- [x] Store and save recipes
- [x] Remove recipes
- [x] Add to home screen adn run locally for iOS and Android
- [x] Full offline functionality
- [x] Offline functionality synchronises with database with background sync, utilises Firebase and IndexedDB APIs
- [x] Dynamic caching
- [x] Fulfills all Google Lighthouse Audit requirements for an excellent, full-featured PWA
- [x] Real time data allows new databases to be shown without refreshing
- [x] Offline fallback pages for uncached/non-existent routes
- [x] Controllable cache size
- [x] Activity automatically updates on all devices running PWA
- [x] Full manifest.json adjusted for full Android and iOS support
- [x] Add to Home Screen banner 

### How to Run
```
$ git clone https://github.com/barclayd/Cookbook-PWA.git
$ cd Cookbook-PWA/public
```
Either run a local server to view PWA live with changes locally or open index.html in browser

### Future Improvements

* Allow more information to be stored for a given recipe
  * e.g. photos, quantities, links

