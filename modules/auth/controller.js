class AuthController {

  constructor() {
    this.logger  = require('../../winston-custom-log');
    this.service = require('./service');
  }

  authenticate(req, res, next) {
    this.logger.info('AuthController::authenticate => Iniciando autenticação do usuário.');
    const user = req.body || {};
    if (!this.isValidUser(user)) {
      res.send(400, {
        message: 'Um ou mais campos obrigatórios não foram informados.',
      });
      return next();
    }

    this.service.login(user.username, user.password).then(doc => {
      this.logger.info('AuthController::login => Autenticação de usuário realizada com sucesso.');
      res.send(200, doc);
    }).catch((err) => {
      this.logger.error(`AuthController::login => Falha ao autenticar usuário: ${err}`);
      res.send(500, { msg: 'failure', status: err });
      return next();
    });
  }

  isValidUser(user) {
    this.logger.info('AuthController::isValidUser => Validando campos obrigatórios para usuario.');
    if (!user.username || !user.password) {
      this.logger.error('AuthController::isValidUser => Um ou mais campos obrigatórios não foram informados.');
      return false;
    }
    this.logger.info('AuthController::isValidUser => Campos obrigatórios validados com sucesso.');
    return true;
  }
}

module.exports = new AuthController();
