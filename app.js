const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring');
const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')
    const url = req.url.toString()

    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1])

    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.writeHead('404 Not Found')
    res.serverHandle()

    res.serverHandle(JSON.stringify(resData))
}

module.exports = serverHandle;