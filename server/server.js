//const WebSocket = require('ws');
//const wss = new WebSocket.Server({ port: 8082 });

/*
// Verbindungs-Handler für eingehende WebSocket-Verbindungen
wss.on('connection', (ws) => {
  console.log('Client verbunden');

  // Empfangene Nachrichten behandeln
  ws.on('message', (message) => {
    console.log('Nachricht erhalten:', message);


    const jsonMessage = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonMessage);
      }
    });
  });

  // Verbindungs-Handler für getrennte Verbindungen
  ws.on('close', () => {
    console.log('Client getrennt');
  });
});
*/
//process.env.TZ = 'Europe/Berlin';
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser"); /* deprecated */



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

//const db = require("./app/models");
//db.sequelize.sync();

require("./app/routes/def_family_member.routes")(app);
require("./app/routes/def_task_category.routes")(app);
require("./app/routes/def_task_category_sub.routes")(app);
require("./app/routes/def_task_category_sub_sub.routes")(app);
require("./app/routes/tab_familys.routes")(app);
require("./app/routes/tab_family_members.routes")(app);
require("./app/routes/tab_tasks.routes")(app);



const fs = require('fs');
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

const PORT = config.SERVER_PORT;
const HOST = config.SERVER_HOST;
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}.`);
});



