const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db')
const con = mysql.createConnection(MYSQL_CONF)


con.connect();


// 统一执行 sql
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            console.log(result);
            resolve(result);
        })
    })
    return promise
}

module.exports = {
    exec
}