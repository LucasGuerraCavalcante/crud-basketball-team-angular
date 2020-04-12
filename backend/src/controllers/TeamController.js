
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
                    "clientMessage":"A new player has joined the team",
                 };
                resp.status(201);
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

    delete: (req, resp) =>  {

        if (req.body.id) {     
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
                    "clientMessage":"Player deleted",
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
                    "clientMessage":"Player edited",
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