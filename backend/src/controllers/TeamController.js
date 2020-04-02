
module.exports = {

    async index(req, resp) {

        let query = 'SELECT * FROM team;'; 

        db.query(query, (err, result) => {

            if (err) {
                return err;
            }

            return resp.json(result);

        }); 
    },

    create(req, resp) {

        console.log(req.body)

        var name = req.body.name;
        var position = req.body.position;
        var country = req.body.country;
        var role = req.body.role;
        var status = "active";

        var sql = `INSERT INTO team (name, position, country, role, status) VALUES ("${name}","${position}","${country}","${role}","${status}");`; 

        db.query(sql, (err, result) => {

            if (err) {
                return err;
            }

            return resp.json(result);

        });
    }, 

    async delete(req, resp) {

        var matricula = req.query.matricula;

        let query = `DELETE FROM funcionarios WHERE matricula = "${matricula}" LIMIT 1;`;  

        db.query(query, (err, result) => {
            if (err) {
                return err;
            }

            return resp.json(result);
        });
    },

};