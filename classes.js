const serverFile = require('./server')
const mysql = require('mysql');

class getLists {
    
    genEmployeeList(){

    }


    genRoleList(){
        const query = `SELECT role.title AS "role title" FROM role ORDER BY role.id`
        connection.query(query, (err, result) => {
          if (err) throw err;
          const roleArr = [];
          result.forEach(({ title, id }) => {
            roleArr.push(id + " " + title );
          return rolesARR
        })
      })
    }


    genDepartmentList()


}

module.exports = new getLists()