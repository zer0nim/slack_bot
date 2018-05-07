#!/usr/bin/env node

var config = require('./config');
var express = require('express');
var request = require('request');
var app = express();

const rot = require('rot');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var listener = app.listen(config.PORT, function(){
    console.log('Listening on port ' + listener.address().port);
	console.log("Start");
});

app.get('/auth', (req, res) =>{
    res.sendFile(config.VIEW_FOLDER + '/add_to_slack.html');
});

app.get('/auth/redirect', (req, res) =>{
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+config.CLIENT_ID+
            '&client_secret='+config.CLIENT_SECRET+
            '&redirect_uri='+config.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok)
		{
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }
		else
		{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
});

app.post('/rot42', (req, res) =>{
	colors = ["f44336", "e91e63", "9c27b0", "673ab7", "3f51b5", "2196f3", "03a9f4", "00bcd4", "009688", "4caf50", "8bc34a", "cddc39", "ffeb3b", "ffc107", "ff9800", "ff5722"];
	var text = req.body.text;

	if (text.length === 0)
		text = "Please enter text !"
	else
		text = rot(text, 42)

	let data = {
	  response_type: 'in_channel', // public to the channel
	  text: text,
	  attachments:[ {
	    image_url: 'https://dummyimage.com/600x400/' + colors[ Math.floor(Math.random() * colors.length) ] + '/fff&text=' + text
	  } ]};
	res.json(data);
});


app.post('/strrev', (req, res) =>{
	colors = ["f44336", "e91e63", "9c27b0", "673ab7", "3f51b5", "2196f3", "03a9f4", "00bcd4", "009688", "4caf50", "8bc34a", "cddc39", "ffeb3b", "ffc107", "ff9800", "ff5722"];
	var text = req.body.text;

	if (text.length === 0)
		rev = "Please enter text !";
	else
		rev = text.split("").reverse().join("");

	let data = {
	  response_type: 'in_channel', // public to the channel
	  text: rev,
	  attachments:[ {
	    image_url: 'https://dummyimage.com/600x400/' + colors[ Math.floor(Math.random() * colors.length) ] + '/fff&text=' + rev
	  } ]};
	res.json(data);
});

app.post('/decode_rot42', (req, res) =>{
	colors = ["f44336", "e91e63", "9c27b0", "673ab7", "3f51b5", "2196f3", "03a9f4", "00bcd4", "009688", "4caf50", "8bc34a", "cddc39", "ffeb3b", "ffc107", "ff9800", "ff5722"];
	var text = req.body.text;

	if (text.length === 0)
		text = "Please enter text !";
	else
		text = rot(text, 26 - 42 % 26);

	let data = {
	  response_type: 'in_channel', // public to the channel
	  text: text,
	  icon_emoji: ':seksek:',
	  attachments:[ {
		image_url: 'https://dummyimage.com/600x400/' + colors[ Math.floor(Math.random() * colors.length) ] + '/fff&text=' + text
	  } ]};
	res.json(data);
});

app.post('/slack/receive', (req, res) =>{ // event subscription
	if (req.body.token === config.VERIF_TOKEN)
	{
		if (req.body.type === "url_verification") // to verify the event subscription qith slack api
		{
			res.status(200);

			let data = {
				challenge: req.body.challenge
			};

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(data));
		}
		else
		{
			let data = {
			};

			if (req.body.event.text === "Why seksek ?")
			{
				// Configure the request
				var options = {
					url: 'https://slack.com/api/chat.postMessage',
					method: 'POST',
					headers: {
						'Content-Type':     'application/x-www-form-urlencoded'
					},
					form: {
						icon_emoji: ':seksek:',
						token: config.TOKEN2,
						channel: req.body.event.channel, // public to the channel
						text: "Why not ¯\\_(ツ)_/¯"
					},

				}

				// Start the request
				request(options, function (error, response, body)
				{
					if (!error && response.statusCode == 200)
					{
						// Print out the response body
						console.log(body);
					}
				});
			}

			res.status(200);

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(data));
		}
	}
});

// v--------------------- button message test ---------------------v
//
// app.post('/whynot', (req, res) =>{
//     var reqBody = req.body
//     if (reqBody.token != config.VERIF_TOKEN)
//         res.status(403).end("Access forbidden")
//     else
// 	{
// 		let data = {
// 		  response_type: 'in_channel', // public to the channel
// 		  attachments: [
// 			  {
// 				  "response_type": 'in_channel', // public to the channel
//					icon_emoji: ':seksek:',
// 				  "text": "Why not ?",
// 				  "fallback": "Shame... buttons aren't supported in this land",
// 				  "callback_id": "button_tutorial",
// 				  "color": "#3AA3E3",
// 				  "attachment_type": "default",
// 				  "actions": [
// 					  {
// 						  "name": "maybe",
// 						  "text": "maybe",
// 						  "type": "button",
// 						  "value": "maybe",
// 						  "style": "primary"
// 					  },
// 					  {
// 						  "name": "no",
// 						  "text": "no",
// 						  "type": "button",
// 						  "value": "no",
// 						  "style": "danger"
// 					  }
// 				  ]
// 			  }
// 		  ]
// 		};
// 		res.json(data);
//     }
// });
//
// app.post('/receive', (req, res) =>{
//	var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
//	if (actionJSONPayload.callback_id === "button_tutorial")
//	{
//		if (actionJSONPayload.actions[0].value === "maybe")
//		{
//			let data = {
//				response_type: 'in_channel', // public to the channel
//				"replace_original": false,
//				icon_emoji: ':seksek:',
//				text: "maybe"
//			};
//			res.json(data);
//		}
//		else
//		{
//			let data = {
//				response_type: 'in_channel', // public to the channel
//				"replace_original": false,
//				icon_emoji: ':seksek:',
//				text: "no god please noo ! :noo:"
//			};
//			res.json(data);
//		}
//	}
// });
//
// ^--------------------- button message test ---------------------^
