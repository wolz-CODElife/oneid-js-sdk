<p align="center">
    <a href="https://moralis.io">
    <img width="101" height="101" src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F3573057892-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWhuGOwO2oLcGtuN6fGER%252Ficon%252FTxjMr2HoTqTwjojE1eTb%252FoneId_logo_red.png%3Falt%3Dmedia%26token%3D5b348048-42a9-439d-a6d2-cc487fdc16ae" class="attachment-full size-full" alt=OneID" loading="lazy" /></a>
</p>

<h2 align="center">OneID SDK for JavaScript</h2>

<p align="center">
    A library that gives you access to OneID SSO services from your JavaScript app. <a href="https://business.oneidtech.com">Create A Developer Account Here</a>
</p>

<br>

For more information on Moralis and its features, see [the website](https://oneidtech.com), [the Native SSO API docs](https://one-identity.gitbook.io/native-oneidtech-sso/).

# 🚀 Getting Started

The easiest way to integrate the OneID SDK into your JavaScript project is through the [npm module](https://npmjs.org/oneid).
However, if you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/oneid/dist/oneid.js](https://unpkg.com/oneid/dist/oneid.js), and the minified production version is at [https://unpkg.com/oneid/dist/oneid.min.js](https://unpkg.com/oneid/dist/oneid.min.js).


To use the npm modules for a browser based application, include it as you normally would:

```js
// ES5 
const OneId = require('../oneid-sdk/index.js');
// ES6
import OneId from '../oneid-sdk/index.js'
```

# 💻 Usage
## OneId.start(options)
The initialization of OneId comes first. This is done at the highest level of your application to guarantee that the OneId SDk's global instance executes correctly.
To get the SDK started, use the `start()` method as follows:

### Example code:

```javascript
const options = {
    apiKey: "YOUR_API_KEY",
    redirectURL: "YOUR_REDIRECT_URL"
}
window.addEventListener('load', () => {
    OneId.start(options)
}
```

| options | Description |
| ------- | ----------- |
| apiKey  | This is a private key assigned to each developer's account. Generate one [here](https://business.oneidtech.com/developer/create-business-account).|
| redirectURL | This a url of the `same-origin` with your application  ]

## OneId.handleAuth(options)
Using the SDK for user authentication is really simple. When you call the `handleAuth()` method, a window will pop up which processes the authentication and then returns you to the application.
The user's profile and token are stored using `localstorage`.

### Example code:

```javascript
const options = {
    type: "login",
    scope: "profile"
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    OneId.handleAuth(options).then((data) => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    })
})
```

| options | Description |
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

```javascript
window.addEventListener('load', () => {
    console.log(OneId.currentUser());
})
```

| options | Data type | Description |
| ------- | --------- | ----------- |
| user  | `Object` | The user object contains the `id`,  |
| token | `String` | |



## Typescript support

Coming soon
