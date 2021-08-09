
const serverHandle = require('../app')

const http = require('http');
const PORT = 8000

http.createServer(serverHandle).listen(PORT);