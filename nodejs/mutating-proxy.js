// https://github.com/nodejitsu/node-http-proxy/issues/382#issuecomment-238874229

var http = require('http'),
    connect = require('connect'),
    httpProxy = require('http-proxy');
var replaceStream = require('replacestream');
var app = connect();
var proxy = httpProxy.createProxyServer({});

app.use(function(req, res) {
    // Magic starts HERE
    // Put here any Transform stream you wish, I used replaceStream,
    // you can write your own using following method
    // http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html#creating-transform-stream-which-uppercases-all-text
    var replace = replaceStream('script', 'NOSCRIPT');
    var _write = res.write;
    var _end = res.end;

    replace.on('data', function(buf){
        _write.call(res, buf);
    });
    replace.on('end', function(){
        _end.call(res);
    });

    res.write = function(data){
        replace.write(data);
    };
    res.end = function(){
        replace.end();
    };
    // Magic ends HERE

    proxy.web(req, res, { target: 'http://' + req.headers.host });
});

var proxyServer = http.createServer(app);
console.log("listening on port 5050")
proxyServer.listen(5050);
