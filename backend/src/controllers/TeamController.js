
module.exports = {

    index: (req, resp) => {

        const sql = 'SELECT * FROM team;'; 

        connection.query(sql, function (err, result) {

            if (err) throw err;

            return resp.json(result);

        });
    },

    create: (req, resp) => {

        const name = req.body.name;
        const position = req.body.position;
        const country = req.body.country;
        const role = req.body.role;
        const status = "active";

        const sql = `INSERT INTO team (name, position, country, role, status) VALUES ("${name}","${position}","${country}","${role}","${status}");`; 

        connection.query(sql, function (err, result) {

            if (err) throw err;

            return resp.json(result);

        });
    }, 

    delete: (req, resp) =>  {

        console.log(req)

        const id = req.body.id;

        console.log(id)

        const sql = `DELETE FROM team WHERE id = ${id} LIMIT 1;`;  

        connection.query(sql, function (err, result) {

            if (err) throw err;

            return resp.json(result);
        });
    },

};