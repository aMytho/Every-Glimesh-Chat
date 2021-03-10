const fs = require("fs");
const WebSocket = require("ws"); // websocket library
const url = `wss://glimesh.tv/api/socket/websocket?vsn=2.0.0&client_id=CLIENTID` // Add your client ID
console.log( __dirname + '/media/glimCampFire.gif')
var a = process.cwd()
var filepath = a.replace(/\\/g , `/`);
console.log(filepath);
var channelName = "mytho"

var glimdropURLs = {
    glimCampFire: filepath + '/media/glimCampFire.gif',
    glimChomp: filepath + '/media/glimChomp.gif',
    glimWave: filepath + '/media/glimWave.gif',
    glimLove: filepath + '/media/glimLove.gif',
    glimTable: filepath + '/media/glimTable.gif',
    glimTaco: filepath + '/media/glimTaco.gif',
    catCar: filepath + '/media/catCar.gif',
    catJam: filepath + '/media/catJam.gif',
}

var keyWords = ['chomp', 'hungry', 'sleepy', 'sleep', 'snore', 'nap', 'snooze', 'tired', 'night', 'cat', 'kitten', 'kitty', 'meow', 'cats',
'hello', 'hi', 'hey', 'wave', 'love', '<3', ':glimlove:', 'heart', 'table', 'rage', 'angry', ':tableflip:', ':glimtableflip:', "taco", "paco", "jam",
'music', 'tunes']

  connection = new WebSocket(url); // Connection is now an offical connection!
  connection.on("open", function open() { // When the connection opens...
    console.log("Connected to the Glimesh API");
    connection.send('["1","1","__absinthe__:control","phx_join",{}]'); //requests a connection
    connection.send(`["1","6","__absinthe__:control","doc",{"query":"subscription{ chatMessage {message, user {username}, channel {streamer {displayname}}} }","variables":{} }]`); //joins every channel
 setInterval(() => { //every 30 seconds send a heartbeat so the connection won't be dropped for inactivity.
      connection.send('[null,"6","phoenix","heartbeat",{}]');
    }, 30000);
    //every 5 minutes get the current view count

  });

connection.on("message", function (data) { //We recieve a message from glimesh chat! (includes heartbeats and other info)
  try {
    //First check for heartbeat message.
    var chatMessage = JSON.parse(data);
    if (chatMessage[4].status !== undefined) {
      console.log("Status: " + chatMessage[4].status);
    } else {
      //Its probably a chat message
      try {

        if (chatMessage[4].result.data !== undefined) {
          var userChat = chatMessage[4].result.data.chatMessage.user.username;
          var messageChat = chatMessage[4].result.data.chatMessage.message;
          var channel = chatMessage[4].result.data.chatMessage.channel.streamer.displayname
          //console.log(channel + "|| " + userChat + ": " + messageChat);
          if (channel.toLowerCase() == channelName) {
            console.log("\x1b[41m", "\x1b[34m", channel, "|| ", '\x1b[36m', userChat, ": ", "\x1b[37m", messageChat, '\x1b[0m');
          } else if (messageChat.indexOf(channelName.toLowerCase()) !== -1 || messageChat.indexOf(channelName) !== -1 || messageChat.indexOf(channelName.toUpperCase()) !== -1) {
            console.log("\x1b[43m", channel, "|| ", '\x1b[36m', userChat, ": ", "\x1b[37m", messageChat, '\x1b[0m');
          } else {
            console.log("\x1b[34m", channel, "|| ", '\x1b[36m', userChat, ": ", "\x1b[37m", messageChat, '\x1b[0m');
            //console.log(chatMessage[4].result.data.chatMessage.tokens)
          }
          var chatMessageSplit = messageChat.toLowerCase().split(" ");
          for (let index = 0; index < chatMessageSplit.length; index++) {
            // compare against every bad word.
            var wordFound = keyWords.indexOf(chatMessageSplit[index]);
            if (wordFound !== -1) {
                switch (chatMessageSplit[index]) {
                    case "chomp":
                    case "hungry":
                        console.log("\x1b[33m Switching background to Chomping Glimdrop! \x1b[89m")
                        changeBackground(glimdropURLs.glimChomp)
                        break;
                    case "sleepy":
                    case "sleep":
                    case "snore":
                    case "nap":
                    case "snooze":
                    case "tired":
                    case "night":
                        console.log("\x1b[33m Switching background to Sleeping Glimdrop! \x1b[89m")
                        changeBackground(glimdropURLs.glimCampFire)
                        break;
                    case "cat":
                    case "cats":
                    case "kitten":
                    case "meow":
                    case "kitty":
                        console.log("\x1b[33m Switching background to car go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr! \x1b[89m")
                        changeBackground(glimdropURLs.catCar);
                        break;
                    case "hello":
                    case "hi":
                    case "hey":
                    case "wave":
                        console.log("\x1b[33m Switching background to Waving Glimdrop! \x1b[89m")
                        changeBackground(glimdropURLs.glimWave);
                        break;
                    case "love":
                    case "heart":
                    case "<3":
                    case ":glimlove:":
                        console.log("\x1b[33m Switching background to Love Glimdrop! \x1b[89m")
                        changeBackground(glimdropURLs.glimLove);
                        break;
                    case "table":
                    case "angry":
                    case "rage":
                    case ":tableflip:":
                    case "glimtableflip":
                    console.log("\x1b[33m Switching background to Table Flip Glimdrop! \x1b[89m")
                    changeBackground(glimdropURLs.glimTable);
                         break;
                    case "taco":
                    case "paco":
                        console.log("\x1b[33m Switching background to Taco Glimdrop! \x1b[89m")
                        changeBackground(glimdropURLs.glimTaco);
                         break;
                    case "jam":
                    case "music":
                    case "banger":
                    case "tunes":
                        console.log("\x1b[33m Switching background to Cat Jam! \x1b[89m")
                        changeBackground(glimdropURLs.catJam);
                         break;
                    default:
                    break;
                }
                break
            }

        }
        }
      } catch (e2) {
        console.log(e2);
      }
    }
  } catch (e1) {
    console.log(e1);
  }
});

function changeBackground(background) {
    var data = `// This file was initially generated by Windows Terminal 1.1.2233.0
    // It should still be usable in newer versions, but newer versions might have additional
    // settings, help text, or changes that you will not see unless you clear this file
    // and let us generate a new one for you.

    // To view the default settings, hold "alt" while clicking on the "Settings" button.
    // For documentation on these settings, see: https://aka.ms/terminal-documentation
    {
        "$schema": "https://aka.ms/terminal-profiles-schema",

        "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",

        // You can add more global application settings here.
        // To learn more about global settings, visit https://aka.ms/terminal-global-settings

        // If enabled, selections are automatically copied to your clipboard.
        "copyOnSelect": false,

        // If enabled, formatted data is also copied to your clipboard
        "copyFormatting": false,

        // A profile specifies a command to execute paired with information about how it should look and feel.
        // Each one of them will appear in the 'New Tab' dropdown,
        //   and can be invoked from the commandline with 'wt.exe -p xxx'
        // To learn more about profiles, visit https://aka.ms/terminal-profile-settings
        "profiles":
        {
            "defaults":{
        "backgroundImage": "${background}",
        "backgroundImageOpacity": 0.3,
       "backgroundImageStretchMode": "uniformToFill",
       "fontSize": 22
            },
            "list":
            [
                {
                    // Make changes here to the powershell.exe profile.
                    "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                    "name": "Windows PowerShell",
                    "commandline": "powershell.exe",
                    "hidden": false
                },
                {
                    // Make changes here to the cmd.exe profile.
                    "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                    "name": "Command Prompt",
                    "commandline": "cmd.exe",
                    "hidden": false
                },
                {
                    "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                    "hidden": false,
                    "name": "Azure Cloud Shell",
                    "source": "Windows.Terminal.Azure"
                },
                {
                    "guid": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
                    "hidden": false,
                    "name": "Ubuntu-20.04",
                    "source": "Windows.Terminal.Wsl"
                }
            ]
        },

        // Add custom color schemes to this array.
        // To learn more about color schemes, visit https://aka.ms/terminal-color-schemes
        "schemes": [],

        // Add custom keybindings to this array.
        // To unbind a key combination from your defaults.json, set the command to "unbound".
        // To learn more about keybindings, visit https://aka.ms/terminal-keybindings
        "keybindings":
        [
            // Copy and paste are bound to Ctrl+Shift+C and Ctrl+Shift+V in your defaults.json.
            // These two lines additionally bind them to Ctrl+C and Ctrl+V.
            // To learn more about selection, visit https://aka.ms/terminal-selection
            { "command": {"action": "copy", "singleLine": false }, "keys": "ctrl+c" },
            { "command": "paste", "keys": "ctrl+v" },

            // Press Ctrl+Shift+F to open the search box
            { "command": "find", "keys": "ctrl+shift+f" },

            // Press Alt+Shift+D to open a new pane.
            // - "split": "auto" makes this pane open in the direction that provides the most surface area.
            // - "splitMode": "duplicate" makes the new pane use the focused pane's profile.
            // To learn more about panes, visit https://aka.ms/terminal-panes
            { "command": { "action": "splitPane", "split": "auto", "splitMode": "duplicate" }, "keys": "alt+shift+d" }
        ]
    }

    `
    fs.writeFile(`filePathToWindowsTerminalSettings`, data, null, function() {

    })
}
