const db = require("../models");

// Retrieve all Objects from the database.
exports.authUser = (req, res) => {
  const jwt = require('jsonwebtoken');
  const bodyParser = require('body-parser');
  const twinBcrypt = require('twin-bcrypt');
  const fs = require('fs');



  const configFile = fs.readFileSync('./config.json');
  const config = JSON.parse(configFile);

  const authHeader = req.headers.authorization;
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];

  const passwordFileContent = fs.readFileSync('./app/config/passwort', 'utf-8');
  const lines = passwordFileContent.split('\n');
  const users = {};
  
  lines.forEach(line => {
    const [user, hash] = line.split(':');
    if (user && hash) {
      users[user] = hash;
    }
  });
  
  db.tab_users.findOne({
    where:{email:username}
  })
  .then(data => {

    console.log(data.ID);
    if (data) {

      twinBcrypt.compare(password, data.password, function(result) {
        if(result){
          const token = jwt.sign({ ID: data.ID,txt_name:data.txt_name,email:data.email }, config.JWT_SECRETE_KEY, { expiresIn: config.JWT_EXPIRETIME });
          res.json({ token });
        }else{
          res.send(false)
        }
      });
  
    } else {
      res.send(false);
      console.log(`Benutzer nicht gefunden.`);
    }


  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving objects."
    });
  });



 

};
