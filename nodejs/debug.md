# Debugging production code without exposing the source map to client

This is a theoretical solution that doesn't make sense until React core is
fixed to allow the window onerror handler to intercept React.render etc exceptions.
There's currently a PR for that: https://github.com/facebook/react/issues/2461

Also webpack currently does not allow SourceMap generation without including
it in the served bundle (and without producing it in the public output path).

The idea is to pass the minified stack trace to the client along with file name,
column, line, message and compilation hash. Then the server would load the
SourceMap for that hash and resolve the stack trace to match source code.


## Snips (server)

    const maps = {};
    import { SourceMapConsumer } from 'source-map';
    import fs from 'fs';

    app.get('/debug/error', (req, res, next) => {
      const {file, line, col:column, trace, message} = req.query;

      function logError(logMessage) {
        console.log('-------------------', logMessage);
        // errorLogger.log('error', logMessage, {ip: req.ip});
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('OK');
      }

      function logResolvedError(unresolvedError) {
        if (unresolvedError) {
          logError(message);
        } else {
          const smc = new SourceMapConsumer(maps[file]);
          const resolvedMessage = smc.originalPositionFor({
            line,
            column
          });
          logError(resolvedMessage);
        }
      }

      if (maps[file] === undefined) {
        const mapPath = path.resolve('../static/dist/' + path.basename(file) + '.map');
        console.log('*** READING', mapPath);
        fs.readFile(mapPath, 'utf8', (err, data) => {
          console.log(err || data.slice(0, 100));
          // maps[file] = JSON.parse(data);
          // console.log(Object.keys(maps[file]));
          logResolvedError('foo');
        });
      } else {
        logResolvedError();
      }
    });
