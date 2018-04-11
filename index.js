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
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
});

app.post('/rot42', (req, res) =>{
	var text = req.body.text;
	res.send(rot(text, 42));
});

app.post('/decode_rot42', (req, res) =>{
	var text = req.body.text;
	res.send(rot(text, 26 - 42 % 26));
});
