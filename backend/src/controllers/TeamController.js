
module.exports = {

    index: (req, resp) => {

        const sql = 'SELECT * FROM team;'; 

        connection.query(sql, function (err, result) {
            if (err) throw err;
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
    
                if (err) throw err;

                resp.status(201);
                return resp.json({ "response":"A new player has joined the team" });
            });
        } 
        else {
            resp.status(400);
            return resp.json({ "error":"Null fields are not accepted" });
        }
    }, 

    delete: (req, resp) =>  {

        if (req.body.id) {     
            const id = req.body.id;
            const sql = `DELETE FROM team WHERE id = ${id} LIMIT 1;`;  

            connection.query(sql, function (err, result) {

                if (err) throw err;

                resp.status(200);
                return resp.json({ "response":"Player deleted" });
            });
        }
        else {
            resp.status(400);
            return resp.json({ "error":"Missing id" });
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
    
                if (err) throw err;

                resp.status(200);
                return resp.json({ "response":"Player edited" });
            });
        }  
        else {
            resp.status(400);
            return resp.json({ "error":"Null fields are not accepted" });
        }
    },

};