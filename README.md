# dwolla-plaid-react-firebase

It's right here.  The phone auth starter for react you've been looking for. This project includes routing as well. It is also set up with plaid+dwolla

## Setup

#### you can read the offical guide for the dwolla+plaid integration here 
https://developers.dwolla.com/resources/dwolla-plaid-integration.html

You need to create a file called ```config.js``` in ```src/firebase/```.
the file should look something like this:
```

var firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
};
export default firebaseConfig;
```
you get the keys when you create a new project on firebase. these are the steps:
1. create and name project
2. go to authorization
3. select 'sign in method'
4. select phone
5. enable phone auth
6. select web from the options web, ios, android
7. you will be prompted to generate keys. copy the keys you get from firebase into your config.js folder


After this run ```firebase-init``` in the project to do this you will need to install firebase-tools [https://firebase.google.com/docs/cli/]. setup your project with functions and hosting.  in the functions directory you will need to add a keys.js file like this:
```javascript
const DWOLLA_APP_KEY = "your dwolla app key";
const DWOLLA_APP_SECRET = "your dwolla secret key";
const PLAID_CLIENT_ID = "your plaid clinet key";
const PLAID_SECRET = "your plaid secret key";
const PLAID_PUBLIC_KEY = "your plaid public key";
const PLAID_ENV = "sandbox";
const DATABASE_URL = "plaid database url";

export {DWOLLA_APP_KEY, DWOLLA_APP_SECRET, PLAID_CLIENT_ID, PLAID_ENV, PLAID_PUBLIC_KEY, PLAID_SECRET, DATABASE_URL};
```

Next up add the serviceAccountKey.json file like this:
```javascript
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}

```


after that you just have to ``` npm run install ``` then```and npm run start```  and your off to the races.




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
