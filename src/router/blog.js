const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id || '';
    

    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        }).catch((err) => {
            return new ErrorModel({message: '查询错误'})
        })
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(detail => {
            console.log('detail: ', detail);
            return new SuccessModel(detail)
        }).catch((err) => {
            console.log('err: ', err);
            return new ErrorModel({message: '传id'})
        })
        // return new SuccessModel(detailData);
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        // const data = newBlog(blogData)
        // return new SuccessModel(data);
        const author = 'zhangsan'
        req.body.author = author;
        const result = newBlog(blogData);
        return result.then(data => {
            console.log('new result: ', data);
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(value => {
            if (value) {
                return new SuccessModel({})
            } else {
                return new ErrorModel({message: '更新失败'})
            }
        })
        
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangsan'
        const result = delBlog(id, author)
        return result.then(value => {
            if (value) {
                return new SuccessModel({})
            } else {
                return new ErrorModel({message: '删除失败'})
            }
        })
    }
}

module.exports = handleBlogRouter;