<p style="text-align: center;">
    <a href="https://oneidtech.com">
    <img width="101" height="101" src="https://i.postimg.cc/XYwGw2WQ/One-ID-logo-Icon-PNG.png" alt="OneID" loading="lazy" /></a>
</p>

# OneID SDK for JavaScript

[![NPM](https://img.shields.io/npm/v/oneid-sdk.svg)](https://www.npmjs.com/package/oneid-sdk)

<p style="text-align: center;">
    A library that gives you access to OneID SSO services from your JavaScript app. <a href="https://console.oneidtech.com">Create A Developer Account Here</a>
</p>

<br>

For more information on OneID and its features, see [the documentation](https://developer.oneidtech.com).

# 🚀 Getting Started

The easiest way to integrate the OneID SDK into your JavaScript project is through the [npm module](https://npmjs.org/oneid-sdk).
However, if you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/browse/oneid-sdk@1.0.10/src/index.ts](https://unpkg.com/browse/oneid-sdk@1.0.10/src/index.ts).

# 📲 Installation
You can easily install this package from NPM by running the following command in your terrminal:
```console
$ npm install --save oneid-sdk
```

Or including the script in your HTML file via UNPKG:
```HTML
<script src="https://unpkg.com/browse/oneid-sdk@1.0.10/src/index.ts"></script>
```

To use the npm modules for a browser based application, include it as you normally would:

```js
// ES5 with module loaders/bundlers 
const OneId = require('oneid-sdk');
// ES6 with module loaders/bundlers
import OneId from 'oneid-sdk'
```
# 🎁Features
The OneID JavaScript SDK currently offers the following features:
- [Initialize SDK](#oneidstartoptions)
- SSO/ Authentication
    - [Authenticate user](#oneidhandleauthoptions)
    - [Check if there is an authenticated user](#oneidisauthenticated)
    - [Get the profile of the current user](#oneidcurrentuser)
    - [Log user out of the SDK](#oneidlogout)

# 💻 Usage
## OneId.start(options)
The initialization of OneId comes first. This is done at the highest level of your application to guarantee that the OneId SDk's global instance executes correctly.
To get the SDK started, use the `start()` method as follows:

### Example code:

```javascript
const options = {
    apiKey: "YOUR_API_KEY",
    siteDomain: "YOUR_SITE_DOMAIN starting with http:// or https://"
}
window.addEventListener('load', () => {
    OneId.start(options)
}
```

| options | Description |
| ------- | ----------- |
| apiKey  | This is a private key assigned to each developer's account. Generate one [here](https://business.oneidtech.com/developer/create-business-account).|
| siteDomain | This a url of the `same-origin` with your application starting with `http://` or `https://`| 

## OneId.handleAuth(options)
Using the SDK for user authentication is really simple. When you call the `handleAuth()` method, a window will pop up which processes the authentication and then returns you to the application.
<!-- The user's profile and token are stored using `localstorage`. -->

### Example code:

```javascript

btn.addEventListener('click', (e) => {
    e.preventDefault()

    OneId.handleAuth().then((data) => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    })
})
```

<!-- | options | Description |
| ------- | ----------- |
| type  | OneId allows 2 types of authentication for now: `login` and `signup` |
| scope | OneId provides user data in 3 scopes: `profile`, `basic` and `advance`  |

## OneId.isAuthenticated()
`isAuthenticated` returns a `Boolean(true || false)` value of whether a user is authenticated or not.

### Example code:

```javascript
window.addEventListener('load', () => {
    if(!OneId.isAuthenticated()) {
        window.location.assign("/login")
    }
})
```

## OneId.currentUser()
To get the user data of the currently authenticated user, call the `currentUser()` method. This method returns a object containing the `user` object and `token`.

### Example code:

```javascript
window.addEventListener('load', () => {
    console.log(OneId.currentUser());
})
```

| options | Data type | Description |
| ------- | --------- | ----------- |
| user  | `Object` | The user object contains the `_id`, `email`, `oneId`(User's OneID ID), `profile`(User's OneID profile object), `username`  |
| token | `String` | The authenticated string assign to each user for signing requests made to the OneID API |

## OneId.Logout()
You can use the `Logout()` method to unregister a user from the OneID instance on your application while the OneID SDK is still running and initialized but the user is disconnect from the OneID API.

### Example code:

```javascript
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault()

    OneId.Logout()
})
``` -->

# 🤝Support
If you have any problems when using this SDK, please file a bug report on this repository by creating an issue and the development team will look into it as soon as possible.

## ⌨ Typescript
This library offers first-class Typescript support.


# ✔ License
MIT &copy; [wolzcodelife.web.app](wolzcodelife.web.app) . GitHub [@wolz-codelife](https://github.com/wolz-codelife)
