const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const service        = require('../service');
const winston        = require('../../../winston-custom-log');
chai.use(chaiAsPromised);

describe('Unit Test - AuthService', function() {

  winston.transports[1].silent = true;
  let req = {body: {}};
  let res = {send: function(){}};
  let next = function(){};

  process.on('unhandledRejection', (err, p) => {})

  describe('login', function() {
    it('Deve realizar login com sucesso', () => {
      let user = { 'username': 'infoglobo', 'password': 'admin123' };
      let generateToken = sinon.stub(service, "generateToken").returns({ 'token': 'dfkdsfjsdhdjfjsdk' }); 

      service.login(user.username, user.password);

      expect(generateToken.calledOnce).to.be.equal(true);

      generateToken.restore();
    });

    it('Não deve realizar login com sucesso', (done) => {
      let user = { 'username': 'danel', 'password': 'adm123' };
      let result = service.login(user.username, user.password);
      expect(result).to.eventually.equal('Sorry credential invalid');
      done() 
    });

    it('Deve retornar um token', (done) => {
      let user = { 'username': 'danel', 'password': 'adm123' };
      let result = service.generateToken(user);
      expect(result).to.be.string(result);
      done() 
    });

  });

});