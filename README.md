This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, run:

npm install to intall all dependencies

after that run:

```bash
# using npm
npm start


```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### Login

When you click "Login," a browser window will open, and you'll need to select an account to log in.
This project does not expose any public routes.

#### Push Notification

This project is designed to send local notifications when the app is in the foreground, and a stock's price falls below the specified alert value.
If you are not receiving any notifications, ensure that notifications are enabled on your device.

##### Final Disclaimer

We only display stock information; we do not provide or guarantee the accuracy of the data.
