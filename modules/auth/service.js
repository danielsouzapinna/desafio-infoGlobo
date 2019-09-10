class AuthService {

  constructor() {
    this.logger  = require('../../winston-custom-log');
    this.jwt     = require('jsonwebtoken');
    this.config  = require('../../config');
  }

  login(username, password) {
    this.logger.info(`AuthService::login => Iniciando validação do usuário.`);
    return new Promise(async(resolve, reject) => {
      if (username === "infoglobo" && password === "admin123") {
        this.logger.info(`AuthService::login => Validação de usuário realizada com sucesso.`);
        let user = { uid: 1, name: 'Info-Globo', admin: true };
        let token = this.generateToken(user);
        resolve({ token })
      }
      this.logger.error(`AuthService::login => Falha ao realizar validação de usuário.`);
      reject("Sorry credential invalid");
    });
  }

  generateToken(user) {
    this.logger.info(`AuthService::login => Gerando token....`);
    let token = this.jwt.sign(user, this.config.jwt.secret, {
      expiresIn: '15m' // token expires in 15 minutes
    });

    return token;
  }

}

module.exports = new AuthService();
