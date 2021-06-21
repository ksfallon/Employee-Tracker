const serverFile = require('./server')
const mysql = require('mysql');

class getLists {
    
    genEmployeeList(){

    }


    genRoleList(){
        const query = `SELECT role.title AS "role title" FROM role ORDER BY role.id`
        connection.query(query, (err, result) => {
          if (err) throw err;
          let rolesARR = []
          rolesARR = rolesARR.concat(JSON.parse(result))
          return rolesARR
        })
    }


    genDepartmentList(){

    }


}

module.exports = new getLists()