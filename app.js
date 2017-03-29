const config = require('./Config');

// making http calls
const request = require('superagent');
//http body parser
const body_parser = require('body-parser');

// init express
const express = require('express');
const app = express();


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(body_parser.urlencoded({
	extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(body_parser.json());

app.post("/charge", (req, res) => {
	let API_KEY_CONVERTED = new Buffer(config.API_SANDBOX + ":").toString("base64");
	request
		.post(config.ENDPOINT_SANDBOX)
		.set("Accept", "application/json")
		.set("Content-Type", "application/json")
		.set("Authorization", "Basic " + API_KEY_CONVERTED)
		.send(req.body)
		.then((success, failure) => {
			console.log("masuk0");
			if(success) {
				console.log("masuk1");
				res.json(success.body);
			} else {
				console.log("masuk2");
				res.json(failure.body);
			}
		})
		.catch(err => {
			res.send(err.response.text);
		})
});

app.post('/save/credit-card/:uid/', (req, res) => {

	let API_KEY_CONVERTED = new Buffer(config.API_SANDBOX + ":").toString("base64");
	let uid = req.params.uid;

	request
		.post(config.ENDPOINT_SANDBOX + "/users/"+uid+"/tokens")
		.set("Accept", "application/json")
		.set("Content-Type", "application/json")
		.set("Authorization", "Basic " + API_KEY_CONVERTED)
		.send(req.body)
		.end(function(failure, success){
			if(success) {
				res.json(success.body);
			} else {
				res.json(failure.body);
			}
		})
});


app.get('/list/credit-card/:uid/', (req, res) => {

	let API_KEY_CONVERTED = new Buffer(config.API_SANDBOX + ":").toString("base64");
	let uid = req.params.uid;

	request
		.get(config.ENDPOINT_SANDBOX + "/users/"+uid+"/tokens")
		.set("Accept", "application/json")
		.set("Content-Type", "application/json")
		.set("Authorization", "Basic " + API_KEY_CONVERTED)
		.end(function(failure, success){
			if(success) {
				res.json(success.body);
			} else {
				res.json(failure.body);
			}
		})
});

app.listen(1732, () => {
	console.log('APP LISTEN')
});
