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
// sql
// const sql = `update users set realname='张三2' where username='zhangsan'`
// con.query(sql, (err, result) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(result);
// })
// con.end()

module.exports = {
    exec
}