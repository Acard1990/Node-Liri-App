// API keys stored in keys.js file which has been set as a variable
var twitterKeys = require('./keys.js');
var spotifyKeys = require('./keys.js');
//requiring dependencies
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//storing command line inputs for later use
var inputCmds = process.argv;

//liri inputs for later use
var liriInput = inputCmds[2];

//allowing for spaces within the input
var inputArg = '';
for (var i = 3; i < inputCmds.length; i++) {
  inputArg += inputCmds[i] + ' ';
}
console.log(liriInput);
//==============================================================================

//==============================================================================

//==============================================================================

//==============================================================================

//==============================================================================

switch (liriInput) {
  //twitter
  case "my-tweets":
    console.log("twitter API");
    break;
    //omdb
  case "movie-this":
    console.log("omdb api");
    break;
    //spotify
  case "spotify-this-song":
    console.log("spotify api");
    break;

  default:
    console.log("Please try again.");
}
