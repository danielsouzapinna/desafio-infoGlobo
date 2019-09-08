module.exports = function(server) {
  const PATH = '/';
  
  server.get({path: PATH, version: '1.0.0'}, healthcheck);
  
  function healthcheck(req, res, next) {
    res.send(200, {msg:"Desafio-infoGlobo v1 está rodando."});
    return next();
  }
};
