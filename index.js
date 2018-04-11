var config = require('./config');
var SlackBot = require('./slackbot.js');

var bot = new SlackBot({
	token: config.TOKEN,
	name: 'SekSek'
});

var params = {
	icon_emoji: ':seksek:'
};

var users_id = [];
var channels_id = [];

bot.on('start', function()
{
	init_users_id();
	init_channels_is();

	bot.on('button_tutorial', function(data)
	{
		console.log(data);
	});


	bot.on('message', function(data)
	{
//	    console.log(data);
		switch(data["type"])
		{
		    case "user_typing":
	    	    typing_handler(data, bot);
		        break;
		    case "message":
		        message_handler(data, bot);
		        break;
		}
	});
});

function init_channels_is()
{
	bot.getChannels().then(function(data){
		for (i = 0; i < data["channels"].length; i++)
		{
			channels_id[ data["channels"][i]["id"] ] = data["channels"][i]["name"];
		}
	});
}

function init_users_id()
{
	for (i = 0; i < config.USERS.length; i++)
	{
		(function(i){
			bot.getUserByEmail(config.USERS[i] + "@student.42.fr").then(function(data){
				users_id[ data["id"] ] = config.USERS[i];
			});
		})(i);
	}
}

function message_handler(data)
{
//	console.log("message_handler");
	// console.log(data);
}

function typing_handler(data)
{
	if (data["user"] in users_id
	&& data["channel"] in channels_id) // check if user exist in the array
	{
		switch(channels_id[ data["channel"] ])
		{
			case "bot":
				c_bot(data, data["channel"]);
		        break;
			case "ohem-coin":
				ohem_coin(data, data["channel"]);
		        break;
		    case "random":
				random(data, data["channel"]);
		        break;
			case "tim-balek":
				tim_balek(data, data["channel"]);
		        break;
		}
	}
}

function c_bot(data, in_chan)
{
	switch(users_id[ data["user"] ])
	{
		case "dandasma":
			break;
		case "gde-pass":
			break;
		case "anhuang":
			break;
		case "jdouniol":
			break;
		case "emarin":
			test(data, in_chan);
			break;
		case "unicolai":
			break;
		case "pmilan":
			break;
		case "jjaniec":
			break;
		case "tnicolas":
			break;
		case "cyfermie":
			break;
		case "ynacache":
			break;
	}
}

function ohem_coin(data, in_chan)
{
}

function random(data, in_chan)
{
}

function tim_balek(data, in_chan)
{
	switch(users_id[ data["user"] ])
	{
		case "dandasma":
			break;
		case "gde-pass":
			break;
		case "anhuang":
			break;
		case "jdouniol":
			break;
		case "emarin":
			break;
		case "unicolai":
			break;
		case "pmilan":
			break;
		case "jjaniec":
			break;
		case "tnicolas":
			break;
		case "cyfermie":
			break;
		case "ynacache":
			break;
	}
}

function fire_annimation(data, in_chan) {
	bot.postMessageToChannel(channels_id[in_chan], ':void:', params, function(data){
		var fire = [":haironfire:",
		":fire::haironfire:",
		":fire::fire::haironfire:",
		":fire::fire::fire::haironfire:",
		":void::fire::fire::fire:",
		":void::void::fire::fire:",
		":void::void::void::fire:"];

		var x = 0;
		var intervalID = setInterval(function () {
		   if (x === fire.length) {
			   bot.deleteMessage(in_chan, data["ts"], true);
			   clearInterval(intervalID);
		   }

		   bot.updateMessage(in_chan, data["ts"], fire[x], params);
		   ++x;
	   }, 400);

	});
}

function test(data, in_chan) {
	params = {
		attachments: [
			{
				"text": "Building buttons is easy right?",
				"fallback": "Shame... buttons aren't supported in this land",
				"callback_id": "button_tutorial",
				"color": "#3AA3E3",
				"attachment_type": "default",
				"actions": [
					{
						"name": "yes",
						"text": "yes",
						"type": "button",
						"value": "yes"
					},
					{
						"name": "no",
						"text": "no",
						"type": "button",
						"value": "no"
					},
					{
						"name": "maybe",
						"text": "maybe",
						"type": "button",
						"value": "maybe",
						"style": "danger"
					}
				]
			}
		]
	};

	bot.postMessageToChannel(channels_id[in_chan], 'test', params, function(data){
		console.log(data);
	});
}

// button_tutorial
