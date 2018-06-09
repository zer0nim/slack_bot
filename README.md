# slack_bot

Just to learn how slackbot api work

## Installation

Create a new slack app
https://api.slack.com/apps

Install `node.js`

Create a file config.js with your infos in the root folder of the repo
```javascript
exports.CLIENT_ID = Client_Secret;

exports.CLIENT_SECRET = Client_Secret;

exports.TOKEN = OAuth_Access_Token;

exports.TOKEN2 = Bot_User_OAuth_Access_Token;

exports.VERIF_TOKEN = Verification_Token;

exports.REDIRECT_URI = Redirect_Url;

exports.PORT = Server_Port

exports.VIEW_FOLDER = "/home/ernest/seksek_bot_v2/view";
```

Install node dependencies
```
$> npm install
```

Launch your node server
```
$> node index.js
```

or

```
$> nodemon index.js
```

## Functionality

**/strrev** `string`

Reverse string
<br/><br/>

**/rot42** `string`

Rotate string letter 42 time
<br/><br/>


**/decode_rot42** `string`

Cancel rot42
<br/><br/>


![slackbot_1](../assets/slackbot_1.png)
![slackbot_2](../assets/slackbot_2.png)
