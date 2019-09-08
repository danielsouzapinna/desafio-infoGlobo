const CrawlerController = require('../modules/crawler/controller');

module.exports = function(server) {
  const PATH = '/crawler';

  server.get({path: PATH, version: '1.0.0'},  CrawlerController.start.bind(CrawlerController));

};