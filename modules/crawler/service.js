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
        let objectJSON = this.generateJSON(xmlData);
        resolve(objectJSON);
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

  generateJSON(xmlData) {
    let $ = this.cheerio.load(xmlData, { normalizeWhitespace: true, xmlMode: true, decodeEntities: true });
    let json = { 'feed': [] };

    $('item').filter( (index, item) => {
      let title = this.getItemTitle($(item));
      let link = this.getItemLink($(item));
      let descriptionHTML = this.getItemDescription($(item));
      let descriptionArray = this.generateArrayOfDescriptionHTML($, descriptionHTML);

      let nodeItem = {}
      nodeItem['item'] = {
        'title': title,
        'link': link,
        'description': descriptionArray
      }
      
      json.feed.push(nodeItem);
    });

    return json;
  }

  getItemTitle(item) {
    return this.decode(item.find('title').text())
  }

  getItemLink(item) {
    return this.decode(item.find('link').text())
  }

  getItemDescription(item) {
    return this.decode(item.find('description').text())
  }

  generateArrayOfDescriptionHTML($, descriptionHTML) {
    let descriptions = [];
    $(descriptionHTML).filter((index, item) => {
      if (this.isTagHTML(item, 'div')) {
        if (this.itemHasClass($, item, 'foto')) {
          this.addItemImage($, item, descriptions);
        } else if (this.itemHasClass($, item, 'saibamais')) {
          this.addItemLinks($, item, descriptions);
        }
      } else if (this.isTagHTML(item, 'p')) {
        this.addItemP($, item, descriptions);
      }
    });

    return descriptions;
  }

  isTagHTML(item, tagName) {
    if (item.name == tagName) {
      return true;
    }
    return false;
  }

  itemHasClass($, item, className) {
    if ($(item).hasClass(className)) {
      return true;
    }
    return false;
  }

  addItemP($, item, descriptions) {
    if (!$(item).text().includes(' &nbsp;') && this.decode($(item).text()).trim().length > 0) {
      let text = this.decode($(item).text()).trim();
      descriptions.push({ 'type': 'text', 'content': text });
    }
  }

  addItemImage($, item, descriptions) {
    let url = $(item).find('img').attr('src');
    if (url) {
      descriptions.push({ 'type': 'image', 'content': url })
    }
  }

  addItemLinks($, item, descriptions) {
    let links = [];
    $(item).children().filter(itemUL => {
      if (this.isTagHTML(itemUL, 'ul')) {
        $(itemUL).children().filter(itemLI => {
          if (this.isTagHTML(itemLI, 'li')) {
            let href = $(itemLI).find('a').attr('href');
            links.push(href);
          }
        });
      }
    });

    descriptions.push({ 'type': 'links', 'content': Object.values(links) })
  }

}

module.exports = new CrawlerService();
