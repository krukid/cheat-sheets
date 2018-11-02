/**
 * This is a debug app that lets you check several aspects of your setup:
 * 1. Prints headers received by the application;
 * 2. Prints environment variables visible within the application;
 * 3. Performs a long streaming request, so you can check graceful shutdown.
 *
 * WARNING does not encode HTML
 *
 * see also:
 * http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering
 * https://gist.github.com/CMCDragonkai/6bfade6431e9ffb7fe88
 */

function streamContent(res, i) {
  if (i < 20) {
    res.write('YO' + i + '; ');
    setTimeout(streamContent.bind(null, res, i + 1), 1000);
  } else {
    res.end('<pre>' + JSON.stringify(process.env, null, 2) + '</pre></body></html>');
  }
}

var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Transfer-Encoding': 'chunked',
      'X-Accel-Buffering': 'no'
    });
    res.write('<!DOCTYPE html><html><head><title>foo</title></head><body>');
    res.write('<pre>' + JSON.stringify(req.headers, null, 2) + '</pre>');
    streamContent(res, 0);
});

server.listen(8080);
