require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();

var fs = require('fs');
var time = formatDate(new Date());
var newLine= "\r\n";


client.login(process.env.BOT_KEY);

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!matchup help")) {
    message.channel.send("Hi I'm Matchup Bot!  I keep track of scores from various users, and provide a handy spreadsheet for analysis!")
    message.channel.send("Write in the following format: !matchup/Winner/Loser/Score/Winner's Deck/Loser's Deck");
    message.channel.send("Be sure to separate entities with a forward slash '/' and don't include the @ symbol with names")
    message.channel.send("For example: !matchup/Winner/Loser/3-0/Delver/UB Reanimator");
  }
  if (message.content.startsWith("!matchup about")) {
    message.channel.send("This bot is written and maintained by numbers with love :)");
  }
  if (message.content.startsWith("!matchup version")) {
    message.channel.send("Matchup Bot version 1.0.0.  Written and Maintained by numbers with love :)");
  }
  if (message.content.startsWith("!matchup/")) {
    const args = message.content.split(/\//ig);
    fs.appendFile('formList.csv', time + args + newLine, function (err) {
      if (err) {
        message.channel.send("Error Saving");
      } else{
        message.channel.send("Success! **" + args[1] + "** *(" + args[4] + ")* " + " beat **" + args[2] + "** *(" + args[5] + ")* " + args[3]);
      }
    }); 
  }
});


function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year + '/';
}