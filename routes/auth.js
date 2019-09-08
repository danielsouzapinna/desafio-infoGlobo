const AuthController = require('../modules/auth/controller');

module.exports = function(server) {
  const PATH = '/auth';

  server.post({path: PATH, version: '1.0.0'},  AuthController.authenticate.bind(AuthController));

};