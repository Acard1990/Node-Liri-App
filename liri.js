//api keys
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
var spotifyApi = require('node-spotify-api');
var userInput = process.argv[2],
        input = process.argv;

var doWhatItSays = false
//==============================================================================
function theliri(userCommand, userInput) {

  switch (userCommand) {
    case "movie-this":
      var query = [];
      request("http://www.omdbapi.com/?t=" + createQuery("mr+nobody") + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (error) {
          console.log(error);
        }
        if (!error && response.statusCode === 200) {
          console.log(`=== OMDB ===  OMDB ===  OMDB ===  OMDB === `)
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year of release: " + JSON.parse(body).Year);
          console.log("IMDB rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1]["Value"]);
          console.log("Country of Origin: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log('===============================================');
        }
      });
      break;

      //======================================================================
    case "do-what-it-says":
      var fs = require("fs");
      doWhatItSays = true;
      fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return err;
        }
        if (data) {
          var info = data.split(',');
          for (var i = 0; i < info.length; i += 2) {
            theliri(info[i], info[i + 1].replace(/"/g, ""));
          }
        }
      });
      break;
      //====================================================================
    case "spotify-this-song":
      var spotify = new spotifyApi(keys.spotifyKeys);
      var query = [];

      function createQuery(defaultPath) {
        if (!process.argv[3] && doWhatItSays === false) {
          return defaultPath;
        } else if (typeof userInput === "object") {
          for (var i = 3; i < userInput.length; i++) {
            var word = userInput[i];
            query.push(word);
          }
          query = query.join("+");
          return query
        } else {
          return userInput;
        }
      }
      console.log(query)
      spotify.request("https://api.spotify.com/v1/search?q=" + createQuery("the+sign+ace+of+base") + "&type=track", function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        if (data) {
          artistArray = [];
          console.log(`=== SPOTIFY === SPOTIFY === SPOTIFY === SPOTIFY ===`)
          for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            let artist = (data.tracks.items[0].artists[i].name);
            artistArray.push(artist);
          }
          console.log("Artist(s): " + artistArray);
          console.log("Song title: " + data.tracks.items[0].name);
          console.log("Preview: " + data.tracks.items[0].preview_url);
          console.log("Album title: " + data.tracks.items[0].album.name);
          console.log(`===============================================`);
        }
      });
      break;

      //========================================================================
    case "my-tweets":
      var params = {
        q: "elonmusk",
        count: 20
      };
      var client = new Twitter(keys.twitterKeys)
      client.get('search/tweets', params, function(error, tweets, response) {
        if (error) {
          return console.log("this is an error:" + JSON.stringify(error));
        }
        if (tweets) {
          console.log(`=== TWITTER === TWITTER === TWITTER === TWITTER ===`)
          for (var x = 0; x < tweets.statuses.length; x++) {
            console.log(`#${x + 1} this tweet was created on: ${tweets.statuses[x].created_at}`);
            console.log(`#${x + 1} tweet: ${tweets.statuses[x].text}`);
          }
          console.log(`===============================================`);
        }
      });
      break;
      //========================================================================
    default:
      console.log("type a requested command");
      console.log("you can type anything from below...");
      console.log('my-tweets');
      console.log('spotify-this-song');
      console.log('movie-this');
      console.log('do-what-it-says');
  }
}

theliri(userInput, input);
