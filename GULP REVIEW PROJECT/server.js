let StaticServer = require('static-server');

let Server = new StaticServer({
    rootPath: './DIST/HTML/',
    port: '8000'
})

Server.start(function () {
    console.log('Server is listening to Port', Server.port,'currently.');
});