const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "news",
    desc: "To get the menu.",
    react: "📜",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  const axios = require("axios");

let storedLink = null;  

const API_ENDPOINT = "https://vajiraapi-089fa316ec80.herokuapp.com/news/lnw"; 

async function sendNews(title, desc, date) {
    const message = `*${title}*\n\n${desc}\n\n${date}`;
    await conn.sendMessage( jid , { text: message });  
}
 
async function checkForNewsUpdates() {
    try {
        const response = await axios.get(API_ENDPOINT);
        const { link, title, desc, date } = response.data;

        if (storedLink !== link) {  
            await sendNews(title, desc, date);
            
            storedLink = link;
        } 
    } catch (error) {
        console.error("Error fetching API data:", error.message);
    }

    // Re-run the function after a 5-minute delay
    setTimeout(checkForNewsUpdates, 5 * 60 * 1000); // 5 minutes in milliseconds
}
 
checkForNewsUpdates();
