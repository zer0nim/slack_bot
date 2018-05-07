# seksek_bot

Just to learn how slackbot api work

## Installation

### Create a new slack app
https://api.slack.com/apps

### Add your config in config.js with:
```javascript
exports.CLIENT_ID = your_clientid_app;

exports.CLIENT_SECRET = your_client_secret;

exports.TOKEN = your_token;

exports.REDIRECT_URI = your_redirect_url;

exports.PORT = your_server_port

exports.VIEW_FOLDER = your_view_folder_location;
```

### Install node dependencies
```
$> npm install
```

### Launch your node server
```
$> node index.js
```

or

```
$> nodemon index.js
```

## Functionality

**/strrev** `string`
-
Reverse string

**/rot42** `string`
-
Rotate string letter 42 time

**/decode_rot42** `string`
-
Cancel rot42

![slackbot_1](../assets/slackbot_1.png)
![slackbot_2](../assets/slackbot_2.png)
