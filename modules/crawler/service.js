class CrawlerService {

  constructor() {
    this.request = require('request')
    this.cheerio = require('cheerio')
    this.decode  = require('parse-entities')
    this.errors  = require('restify-errors');
    this.logger  = require('../../winston-custom-log');
  }

  async processData(url) {
    this.logger.info(`CrawlerService::processData => Iniciando processamento de dados da URL.`);
    return new Promise(async(resolve, reject) => {
      try {
        let xmlData = await this.getDataFromXML(url);
        console.log("data => ", xmlData);
        resolve(true);
      } catch(err) {
        reject(err);
      }
    });
  }

  getDataFromXML(url) {
    this.logger.info(`CrawlerService::getDataFromXML => Recuperando dados da URL.`);
    return new Promise((resolve, reject) => {
      this.request(url, function(error, response, html) {
        if (error) {
          reject('Erro ao realizar leitura da URL');
        }
        resolve(html);
      });
    });
  }

}

module.exports = new CrawlerService();
