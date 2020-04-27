const DatabaseCheck = require('./DatabaseCheck');

module.exports = {

    index: (req, resp) => {

        const sql = 'SELECT * FROM team;'; 

        connection.query(sql, function (err, result) {
            if (err) {
                resp.statusMessage = { 
                    "devMessage":err,
                    "clientMessage":"Unexpected error, try again latter",
                };   
                resp.send(resp.statusMessage).end();
            }
            return resp.json(result);
        });
    },

    create: (req, resp) => {

        if (req.body.name && req.body.position && req.body.country && req.body.role) {

            const name = req.body.name;
            const position = req.body.position;
            const country = req.body.country;
            const role = req.body.role;
            const status = "Active";

            var dataChechResult = '';

            // check if the player already exists 
            DatabaseCheck.existenceCheck(name, function(result){
                dataChechResult = result;

                if (dataChechResult == true) {
                    const sql = `INSERT INTO team (name, position, country, role, status) VALUES ("${name}","${position}","${country}","${role}","${status}");`; 
    
                    connection.query(sql, function (err, result) {
            
                        if (err) {
                            resp.statusMessage = { 
                                "devMessage":err,
                                "clientMessage":"Unexpected error, try again latter",
                            };   
                            resp.send(resp.statusMessage).end();
                        }
        
                        resp.statusMessage = { 
                            "devMessage":"201: Created",
                            "clientMessage":`${name} has joined the team`,
                         };
                        resp.status(201);
                        resp.send(resp.statusMessage).end();
                    }); 
                }
                else if (dataChechResult == false) {
                    resp.statusMessage = { 
                        "devMessage":"406: Not Acceptable",
                        "clientMessage":`${name} is already in the team`,
                     };
                    resp.status(406);
                    resp.send(resp.statusMessage).end();
                }
            });
        } 
        else {
            resp.statusMessage = { 
                "devMessage":"400: Bad Request",
                "clientMessage":"Null fields are not accepted",
             };
            resp.status(400)
            resp.send(resp.statusMessage).end();
        }
    }, 

    delete: (req, resp) =>  {

        if (req.body.id) {  
            const name = req.body.name;
            const id = req.body.id;
            const sql = `DELETE FROM team WHERE id = ${id} LIMIT 1;`;  

            connection.query(sql, function (err, result) {

                if (err) {
                    resp.statusMessage = { 
                        "devMessage":err,
                        "clientMessage":"Unexpected error, try again latter",
                    };   
                    resp.send(resp.statusMessage).end();
                }

                resp.statusMessage = { 
                    "devMessage":"200: OK",
                    "clientMessage":`${name} has left the team`,
                 };
                resp.status(200);
                resp.send(resp.statusMessage).end();
            });
        }
        else {
            resp.statusMessage = { 
                "devMessage":"400: Bad Request",
                "clientMessage":"Missing id",
             };
            resp.status(400)
            resp.send(resp.statusMessage).end();
        }
    },

    update: (req, resp) =>  {

        if (req.body.id && req.body.name && req.body.position && req.body.country && req.body.role && req.body.status) {
            const name = req.body.name;
            const position = req.body.position;
            const country = req.body.country;
            const role = req.body.role;
            const status = req.body.status;
    
            const id = req.body.id;
    
            const sql = `UPDATE team SET name="${name}", position="${position}", country="${country}", role="${role}", status="${status}" WHERE id = ${id};`;  
    
            connection.query(sql, function (err, result) {
    
                if (err) {
                    resp.statusMessage = { 
                        "devMessage":err,
                        "clientMessage":"Unexpected error, try again latter",
                    };   
                    resp.send(resp.statusMessage).end();
                }

                resp.statusMessage = { 
                    "devMessage":"200: OK",
                    "clientMessage":`${name} was edited`,
                 };
                resp.status(200);
                resp.send(resp.statusMessage).end();
            });         
        } 
         
        else {
            resp.statusMessage = { 
                "devMessage":"400: Bad Request",
                "clientMessage":"Null fields are not accepted",
             };
            resp.status(400)
            resp.send(resp.statusMessage).end();
        }
    },

};