class CrawlerController {

  constructor() {
    this.logger = require('../../winston-custom-log');
  }

  start(req, res, next) {
    this.logger.info('CrawlerController::start => Iniciando crawler...');
    res.send(200, { msg: 'success' });
  }

}

module.exports = new CrawlerController();
