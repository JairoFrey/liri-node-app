require("dotenv").config();
// use for requests
var fs = require("fs");
// use to read txt file for 
var request = require("request");
// use for requesting omdb api
var input = (process.argv[2]);
// use for determining user input that determines what command to do
var search = ""
// place holder for what user wants to search for
var keys = require("./keys");
// use for api keys

if (process.argv.length > 3) {
	for(i = 3; i < process.argv.length; i++){
		search += (process.argv[i] + "+")
	}
	}
else {var search = (process.argv[3])}
// set what search is based on how long user input is

function twitter() {
// function for twitter
	var Twitter = require('twitter');
// used to call twitter api
	var client = new Twitter(keys.twitter);

	var params = {screen_name: '27_Virginia_', count: 20};
// shows my user name and how many tweets to show
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
    	console.log(tweets[i].text);
    }
  }
});}
	

function spotify() {
	var Spotify = require('node-spotify-api');
 // calls spotify api
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
// fins specific info in spotify array that is returned from queries
});}


function omdb() {
	request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
// calls omdb api
  if (!error && response.statusCode === 200) {

    console.log("Movie Title: " + JSON.parse(body).Title);
  	console.log("Release Year: " + JSON.parse(body).Year);
 	console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
 	console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
 	console.log("The movie was filmed in: " + JSON.parse(body).Country);
 	console.log("Language: " + JSON.parse(body).Language);
 	console.log("Plot: " + JSON.parse(body).Plot);
 	console.log("Cast: " + JSON.parse(body).Actors);
// finds specific info from omdb array that is retruned from search query 
  }
})};

function dothis() {
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err) {
			return console.log(err);
		}
// reads from random.txt file in folder
		data = data.split(", ");
		// splits data into two items in an array rather than every letter being an item
		input = data[0];
		// makes first item in random.txt into input
		search = data[1];
		// makes second item in random.txt into the song search
		runLiri(input, search);
		// runs liri function with random.txt as the input and search
	})
};

function runLiri(input) {
	if (input == "my-tweets") {
		twitter();
	}
	else if (input == "spotify-this-song") {		
		spotify();
	}
	else if (input == "movie-this") {
		omdb();
	}
	else if (input == "do-what-it-says") {
		dothis();
	}
};
// if statements defining what to do if input = ...
runLiri(input);