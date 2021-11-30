const Discord = require('discord.js');
const client = new Discord.Client();
const Spawn = require('child_process');
const ps = require('ps-node');
let serverOn = false;
let task = false;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!start' && msg.channel.name == "minecraft") {
        console.log("starting server")
        if (!serverOn){
            client.channels.cache.get('SERVERID').send("Server starting. Please remember to !stop it when you're done")
            task = Spawn.exec('cmd /c Start.bat', function () {});
            serverOn = true;
        }else{
	    client.channels.cache.get('SERVERID').send('Server should already be up')
	}
    }
    if (msg.content === '!stop' && msg.channel.name == "minecraft") {
        console.log("stopping server");
        if (serverOn) {
	    client.channels.cache.get('779259448078106645').send('Thanks for stopping the server')
            Spawn.exec(`taskkill /pid ${task.pid} /t /F`, (err, stdout, stderr) => {
                if (err) {
                  client.channels.cache.get('779259448078106645').send('Something broke...')
                }
                console.log('stdout', stdout)
                console.log('stderr', err)
            })
            serverOn = false;
        }
    }
});

client.login('BOT TOKEN HERE');



