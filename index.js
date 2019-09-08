const path            = require('path');
const restify         = require('restify');
const { readdirSync } = require('fs');
const restifyPlugins  = require('restify').plugins;
const config          = require('./config');
const morgan          = require('morgan');
const logger          = require('./winston-custom-log');

const server = restify.createServer({
  name    : config.name,
  version : config.version
});

server.pre(restifyPlugins.pre.sanitizePath());

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.gzipResponse());
server.use(restifyPlugins.throttle({ burst:10, rate:1, ip:true }));

server.use(morgan('{"DATA=>": ":date[clf]", "HTTP METHOD=>": ":method", "STATUS=>": ":status", "URL=>": ":url",  "TEMPO=>": ":response-time", "USER_AGENT=>": ":user-agent"}', {
  stream: {
    write: (message) =>{
      logger.info(message);
		}
	}
}));

server.listen(config.port, function() {

  readdirSync(path.join(__dirname, './routes')).forEach(fileName => {
    const fullPath = path.join(__dirname, './routes', fileName);
    require(fullPath)(server);
  });

  console.log(`Application ${server.name} is listening on port ${config.port}`);
});

module.exports = server;
