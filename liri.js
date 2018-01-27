require("dotenv").config();

var fs = require("fs");

var input = (process.argv[2]);

var search = ""

var keys = require("./keys");



if (process.argv.length > 3) {
	for(i = 3; i < process.argv.length; i++){
		search += (process.argv[i] + "+")
	}
	}
else {var search = (process.argv[3])}


function twitter() {

	var Twitter = require('twitter');

	var client = new Twitter(keys.twitter);

	var params = {screen_name: '27_Virginia_', count: 20};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
    	console.log(tweets[i].text);
    }
  }
});}	

function spotify() {
	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify(keys.spotify);
 
	spotify.search({ type: 'track', query: search }, function(err, data) {
  	if (err) {
    return console.log('Error occurred: ' + err);
  	}
 
 	console.log();
	console.log("Artists: " + data.tracks.items[0].album.artists[0].name); 
	console.log("Song Name: " + data.tracks.items[0].name);
	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	console.log("Album Name: " + data.tracks.items[0].album.name)

});}

spotify();