let StaticServer = require('static-server');

let server = new StaticServer({
    rootPath: './**/*.*',
    port: '8000'
})

server.start(function() {
    console.log('Server started listening at port', server.port);
})