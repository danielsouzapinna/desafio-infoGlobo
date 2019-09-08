class CrawlerController {

  constructor() {
    this.logger  = require('../../winston-custom-log');
    this.service = require('./service');
    this.url     = "https://revistaautoesporte.globo.com/rss/ultimas/feed.xml";
  }

  start(req, res, next) {
    this.logger.info('CrawlerController::start => Iniciando crawler...');

    this.service.processData(this.url).then(doc => {
      res.send(200, { doc });
    }).catch((err) => {
      this.logger.error(`CrawlerController::start => Falha ao processar a URL: ${this.url}`);
      console.log("error: ", err)
      res.send(500, { msg: 'failure', status: err });
      return next();
    });
  }

}

module.exports = new CrawlerController();
