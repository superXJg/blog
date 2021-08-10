const {exec} = require('../db/mysql');
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1`
    if (author) {
        sql += ` and author like'%${author}%'`
    }
    if (keyword) {
        sql += ` and content like '%${keyword}%'`
    }
    sql += ` order by createtime desc`
    // 返回假数据
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => {
        console.log('rows: ', rows);
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    const {title, content, author} = blogData;
    const createTime = Date.now()
    let sql = `insert into blogs(title, content, author, createtime) values('${title}','${content}','${author}',${createTime})`

    return exec(sql).then(inserData => {
        console.log('inserData', inserData)
        return {
            id: inserData.insertId
        }
    })
}
const updateBlog = (id, blogData={}) => {
    console.log('updateBlog: ', id, blogData);
    const {title, content} = blogData;
    let sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    // id 更新
    return exec(sql).then(updateData => {
        console.log('updateData', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}
const delBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(delData => {
        console.log('delData', delData)
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}