# SocialAuth
## Installation

Install the dependencies and devDependencies and start the server.

if eas not installed

```sh
npm install -g eas-cli
```

Step 1: Install

```sh
npm install
```

Step 2: Scan and install the app

```sh
eas build --profile development --platform android
```

Step 3: Scan and paste the url manually

```sh
npx expo start --dev-client
```