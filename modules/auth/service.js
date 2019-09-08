class AuthService {

  constructor() {
    this.logger  = require('../../winston-custom-log');
    this.jwt     = require('jsonwebtoken');
    this.config  = require('../../config');
  }

  loggin(username, password) {
    this.logger.info(`AuthService::loggin => Iniciando validação do usuário.`);
    return new Promise(async(resolve, reject) => {
      try {
        if (username === "infoglobo", password === "admin123") {
          let user = { uid: 1, name: 'Info-Globo', admin: true };
          let token = this.jwt.sign(user, this.config.jwt.secret, {
            expiresIn: '15m' // token expires in 15 minutes
          });

          let { iat, exp } = this.jwt.decode(token);

          resolve({ iat, exp, token })
        }

        reject("Sorry credential invalid");
      } catch(err) {
        reject(err);
      }
    });
  }

}

module.exports = new AuthService();
