'use strict';
var jwt = require('jsonwebtoken');

var SecureApiLib = function(){
  var self = this;

  self.jwtMiddleware = function(req, res, next){
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var secret = 'secretpass';
    
    if(token){
      jwt.verify(token, secret, function(err, decoded) {      
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token falla 1.' });    
        } else {
          // if everything is good, save to request for use in other routes
          console.log(decoded);
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      return res.status(403).json({ message: 'Failed to authenticate token falla 2.' });
    }    
  };	
};

module.exports = new SecureApiLib();