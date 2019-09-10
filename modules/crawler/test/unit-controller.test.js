const sinon = require('sinon');
const expect = require('chai').expect;
const controller = require('../controller.js');

describe('Unit Test - CrawlerController', function() {

  let req = {body: {}};
  let res = {send: function(){}};
  let next = function(){};

  describe('start', function() {
    it('Deve processar dados corretamente - Status Code 200', (done) => {
      let processData = sinon.stub(controller.service, "processData").resolves({ 'token': 'klszdjfvklsddjkf' });
      let sendSpy = sinon.spy(res, "send");

      controller.start(req, res, next).then( ()=> {
          expect(processData.calledOnce).to.be.equal(true);
          expect(sendSpy.withArgs(200).calledOnce).to.be.equal(true);

          processData.restore();
          sendSpy.restore();
          done();
      });
    });

    it('Não deve processar dados corretamente - Status Code 500', (done) => {
      let processData = sinon.stub(controller.service, "processData").rejects({ });
      let sendSpy = sinon.spy(res, "send");
      
      controller.start(req, res, next).then(()=> {
          expect(processData.calledOnce).to.be.equal(true);
          expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

          processData.restore();
          sendSpy.restore();
          done();
      }).catch((done));
    });

  });

});