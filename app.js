const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring');

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')
    const url = req.url.toString()

    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1])
    // post data
    getPostData(req).then(postData => {
        req.body = postData;
        // blog
        // const blogData = handleBlogRouter(req, res);
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )         
            })
            return
        }
        
        // user
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        res.writeHead(404, {"Content-type": "text/plain"})

        res.serverHandle(JSON.stringify({}))
    })
    
}

module.exports = serverHandle;