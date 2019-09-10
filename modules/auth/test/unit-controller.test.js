const sinon      = require('sinon');
const expect     = require('chai').expect;
const controller = require('../controller');
const service    = require('../service');
const winston    = require('../../../winston-custom-log');

describe('Unit Test - AuthController', function() {

  winston.transports[1].silent = true;
  let req = {body: {}};
  let res = {send: function(){}};
  let next = function(){};

  describe('authenticate', function() {
    it('Deve retornar BadRequest - Campos obrigatórios', () => {
      let isValidUser = sinon.stub(controller, "isValidUser").returns(false);
      let sendSpy = sinon.spy(res, "send");

      controller.authenticate(req, res, next);

      expect(isValidUser.calledOnce).to.be.equal(true);
      expect(sendSpy.withArgs(400).calledOnce).to.be.equal(true);

      isValidUser.restore();
      sendSpy.restore();
    });

    it('Deve realizar o login e retornar HTTP Status Code 200', (done) => {
      let isValidUser = sinon.stub(controller, "isValidUser").returns(true);
      let serviceLogin = sinon.stub(controller.service, "login").resolves({ 'token': 'klszdjfvklsddjkf' });

      let sendSpy = sinon.spy(res, "send");

      controller.authenticate(req, res, next).then( ()=> {
          expect(isValidUser.calledOnce).to.be.equal(true);
          expect(serviceLogin.calledOnce).to.be.equal(true);
          expect(sendSpy.withArgs(200).calledOnce).to.be.equal(true);

          isValidUser.restore();
          serviceLogin.restore();
          sendSpy.restore();
          done();
      });
    });

    it('Não deve realizar o login e retornar HTTP Status Code 500', (done) => {
      let isValidUser = sinon.stub(controller, "isValidUser").returns(true);
      let serviceLogin = sinon.stub(controller.service, "login").rejects({
          body:{
              code: 'e01'
          }
      });
      let sendSpy = sinon.spy(res, "send");
      
      controller.authenticate(req, res, next).then(()=> {
          expect(isValidUser.calledOnce).to.be.equal(true);
          expect(serviceLogin.calledOnce).to.be.equal(true);
          expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

          isValidUser.restore();
          serviceLogin.restore();
          sendSpy.restore();
          done();
      }).catch((done));
    });

  });

  describe('isValidUser', function() {
    it('Deve retornar false - Campos obrigatórios não informados', () => {
      let user = {}
      let isValidUser = sinon.spy(controller, "isValidUser");

      let result = controller.isValidUser(user);

      expect(isValidUser.calledOnce).to.be.equal(true);
      expect(result).to.be.equal(false);

      isValidUser.restore();
    });

    it('Deve retornar false - Campos obrigatórios não informados', () => {
      let user = { 'username': 'daniel', 'password': 'admin123' };
      let isValidUser = sinon.spy(controller, "isValidUser");

      let result = controller.isValidUser(user);

      expect(isValidUser.calledOnce).to.be.equal(true);
      expect(result).to.be.equal(true);

      isValidUser.restore();
    });

  });

});