
module.exports = {


    existenceCheck(playersName, callback) {

        const sql = `SELECT name FROM team WHERE name = "${playersName}" OR name = LOWER("${playersName}");`; 
    
        connection.query(sql, function (err, result) {

            if (err){ 
                throw err;
              }

            if (!Object.keys(result).length) {
                return callback(true)
            } else {
                return callback(false)            
            }
            
        });

    }

}