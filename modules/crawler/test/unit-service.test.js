const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const service        = require('../service');
const winston        = require('../../../winston-custom-log');
chai.use(chaiAsPromised);

describe('Unit Test - CrawlerService', function() {

  winston.transports[1].silent = true;
  let req = {body: {}};
  let res = {send: function(){}};
  let next = function(){};

  describe('getDataFromXML', function() {
    it('Deve recuperar XML com sucesso', () => {
      let url = 'http://www.google.com';
      let request = sinon.stub(service, "request").returns(null, null, {}); 

      service.getDataFromXML(url).then(() => {
        expect(request.calledOnce).to.be.equal(true);
      });

      request.restore();
    });
    
    it('Não deve recuperar XML', () => {
      let url = 'http://www.google.com';
      let request = sinon.stub(service, "request").returns({}, null, null); 

      service.getDataFromXML(url).catch(() => {
        expect(request.calledOnce).to.be.equal(true);
      });

      request.restore();
    });
  });

  describe('generateJSON', function() {
    it('Deve gerar JSON com sucesso', () => {
      let item = '<item> <title><![CDATA[Novo Chevrolet Onix Joy: modelo 2020, visual 2016 e interior 2013]]> </title> <description><![CDATA[<div class="foto componente_materia midia-largura-620"><img alt="Onix Joy 2020 (Foto: Divulgação)" height="413" id="345139" src="https://s2.glbimg.com/uGeoVJU4pacNggMq3Omgq8iD1Wc=/620x413/e.glbimg.com/og/ed/f/original/2019/09/06/onix_joy_3.jpg" title="Onix Joy 2020 (Foto: Divulgação)" width="620"/><label class="foto-legenda">O visual dianteiro &eacute; do modelo atual com a novidade da gravatinha preta (Foto: Divulga&ccedil;&atilde;o)</label></div><p>&nbsp;</p><p><br/>A Chevrolet n&atilde;o &eacute; boba. <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2019/08/o-que-ja-sabemos-sobre-o-novo-chevrolet-onix-2020.html" target="_blank">Mesmo com a segunda gera&ccedil;&atilde;o do Onix batendo &agrave; porta</a>, a marca vai manter a t&aacute;tica e deixar o atual modelo em linha &ndash; e com a alcunha Joy.</p><p><strong>Atualmente, o Joy mant&eacute;m o design da linha 2013 do Onix. Agora, na linha 2020, traz o visual de&hellip; 2016! &Eacute; isso mesmo. O modelo, enfim, ter&aacute; o facelift que apareceu no Onix tr&ecirc;s anos atr&aacute;s.</strong></p><p><strong>Traduzindo: cap&ocirc;, grade, far&oacute;is, lanternas e para-choque s&atilde;o, digamos, in&eacute;ditos para a vers&atilde;o. A novidade mesmo &eacute; a op&ccedil;&atilde;o de acabamento chamado Black</strong>, que agrega luz de diurna em LED, rodas aro 15 com calotas escurecidas, ma&ccedil;anetas pintadas na mesma cor da carroceria, logotipo Chevrolet com fundo preto e capa do retrovisor em preto brilhante.</p><div class="foto componente_materia midia-largura-620"><img alt="Onix Joy 2020 (Foto: Divulgação)" height="413" id="345136" src="https://s2.glbimg.com/Xf5v1Rp_zfNBlklSWIGnX_cKhHs=/620x413/e.glbimg.com/og/ed/f/original/2019/09/06/onix_joy_4.jpg" title="Onix Joy 2020 (Foto: Divulgação)" width="620"/><label class="foto-legenda">As lanternas e para-choque s&atilde;o do modelo atual (Foto: Divulga&ccedil;&atilde;o)</label></div><p>&nbsp;</p><p>Dentro, no entanto, o Onix Joy mant&eacute;m o interior &quot;do passado&quot;. O painel de instrumentos tem luz de fundo laranja s&eacute;pia, comandos dos vidros el&eacute;tricos traseiros centralizados &ndash; digno dos carros dos anos 1990 &ndash; e central multim&iacute;dia adquirida como acess&oacute;rio (nada de My Link).</p><p>Tudo para manter o custo baixo.&nbsp;<strong>Pelo o menos h&aacute; acabamento exclusivo no painel central e e os bancos t&ecirc;m novos revestimentos.</strong></p><p>Segundo a fabricante, o modelo vir&aacute; de s&eacute;rie com ar-condicionado, dire&ccedil;&atilde;o com assist&ecirc;ncia el&eacute;trica, transmiss&atilde;o com seis marchas e comando el&eacute;trico das travas e vidros.&nbsp;</p><div class="saibamais componente_materia expandido"><strong>saiba mais</strong><ul><li><a href="https://revistaautoesporte.globo.com/Noticias/noticia/2019/09/flagra-novo-chevrolet-onix-tera-uma-tela-multimidia-maior-e-wi-fi-incluso.html" target="_blank">FLAGRA: NOVO CHEVROLET ONIX TER&Aacute; UMA TELA MULTIM&Iacute;DIA MAIOR E WI-FI INCLUSO</a></li><li><a href="https://revistaautoesporte.globo.com/Noticias/noticia/2019/08/novo-chevrolet-tracker-roda-camuflado-no-brasil-mas-so-chega-em-2020.html" target="_blank">NOVO CHEVROLET TRACKER RODA CAMUFLADO NO BRASIL, MAS S&Oacute; CHEGA EM 2020</a></li></ul></div><p>&nbsp;</p><p>O motor e o pre&ccedil;o n&atilde;o foram revelados, mas o hatch deve manter o 1.0 SPE/4 de m&aacute;ximos 80 cv com etanol e os valor n&atilde;o deve fugir muito do atual, que parte de R$ 47.290.</p><div class="foto componente_materia midia-largura-620"><img alt="Onix Joy 2020 (Foto: Divulgação)" height="413" id="345138" src="https://s2.glbimg.com/XDUKZT6bqKrVMlZrkpVJCgmOuTc=/620x413/e.glbimg.com/og/ed/f/original/2019/09/06/onix_joy_5.jpg" title="Onix Joy 2020 (Foto: Divulgação)" width="620"/><label class="foto-legenda">O interior &eacute; a parte mais obsoleta do &quot;novo&quot; Onix Joy (Foto: Divulga&ccedil;&atilde;o)</label></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><div class="foto componente_materia midia-largura-620"><img alt="Onix Joy 2020 (Foto: Divulgação)" height="413" id="345137" src="https://s2.glbimg.com/AzqqnlU2i8VDon9kGPlGqfLGcX8=/620x413/e.glbimg.com/og/ed/f/original/2019/09/06/onix_joy_6.jpg" title="Onix Joy 2020 (Foto: Divulgação)" width="620"/><label class="foto-legenda">Os bancos t&ecirc;m novos acabamentos, com estilo mais moderno (Foto: Divulga&ccedil;&atilde;o)</label></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>]]> </description> <link>https://revistaautoesporte.globo.com/Noticias/noticia/2019/09/novo-chevrolet-onix-joy-modelo-2020-visual-2016-e-interior-2013.html</link> <dc:creator>Da redação de Auto Esporte</dc:creator> <guid>3957438</guid></item>';

      let result = service.generateJSON(item);

      expect(result.feed).to.be.an('array');
      expect(result.feed[0].item).to.be.an('object');
      expect(result.feed[0].item).to.deep.include({ title: 'Novo Chevrolet Onix Joy: modelo 2020, visual 2016 e interior 2013 ' });
      expect(result.feed[0].item).to.deep.include({ link: 'https://revistaautoesporte.globo.com/Noticias/noticia/2019/09/novo-chevrolet-onix-joy-modelo-2020-visual-2016-e-interior-2013.html' });
      expect(result.feed[0].item.description).to.be.an('array');
    });

  });

});