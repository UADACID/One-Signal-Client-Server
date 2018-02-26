var express = require('express');
var router = express.Router();
var _ = require('underscore');
const mongoose = require('mongoose');
const User = mongoose.model('User', {
    email: {
      type : String,
      unique: true
    },
    password: String,
    pushToken: [
      {token : String, userId: String}
    ],
  });

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().then(result => {
    console.log(result);
    res.send({succes:true,message:result});
  }).catch(err => {
    console.log(err);
    res.send({succes:true,message:err.toString()});
  })

});

router.post('/notifications', (req, res, next) => {

  User.find().then(result => {
    console.log(result);
    if (result.lenght != 0) {
      const users = result
      let newTempArray = []
      const newTokens = result.map(obj => {
        const { pushToken } = obj
        pushToken.map(token => {
          newTempArray.push(token.userId)
        })
      })
      console.log('------usersId-----');
      console.log(newTempArray);
      if (newTempArray.length == 0) {
        return res.send({"message": "no logedin users"})
      }
      var message = {
        app_id: "d1862f0c-fe0b-4e5c-bb0d-81b7b694860c",
        contents: {"en": req.body.message},
        include_player_ids: newTempArray
      };

      sendNotification(message).then(response => {
        res.send(response)
      }).catch(err=> {
        res.send(response)
      })

    }
    // res.send({succes:true,message:result});
  }).catch(err => {
    console.log(err);
    res.send({succes:true,message:err.toString()});
  })

  // var message = {
  //   app_id: "d1862f0c-fe0b-4e5c-bb0d-81b7b694860c",
  //   contents: {"en": request.body.message},
  //   include_player_ids: ['657cb5b3-f87e-4b30-b4bd-764b77381cbc']
  // };
  //
  // sendNotification(message);

});

router.post('/register', (req, res, next) => {
  const { email, password, pushToken, userId } = req.body
  const body = {
    email,
    password,
    pushToken : [{
      token:pushToken,
      userId
    }]
  }
  const user = new User(body);
  user.save().then(() => {
    res.send({succes:true,message:'success create'});
  }).catch(err => {
    res.send({succes:false,message:err.errmsg})
  })

});

router.post('/login', (req, res, next) => {
  const { email, password, pushToken, userId } = req.body
  const body = {
    email,
    password,
    pushToken : [{
      token:pushToken,
      userId
    }]
  }

  User.findOne({email, password}).then(result => {
    if (result !== null) {
      const newPushToken = body.pushToken.concat(result.pushToken)
      const newData = {
        pushToken :  _.uniq(newPushToken, 'token')
      }
      User.update({email},{$set:newData}).then(updateRes => {
        res.send({succes:true,message:'succes update pushToken'})
      }).
      catch(err => {
        res.send({succes:false,message:err.errmsg})
      })
    }else {
      res.send({succes:false, message:'user not found'})
    }
  }).
  catch(err => {
    console.log(err);
    res.send({succes:false,message:err.errmsg})
  })


});

router.post('/logout', (req, res, next) => {
  const { email, pushToken } = req.body
  const body = {
    email,
    pushToken
  }

  User.findOne({email}).then(result => {
    if (result !== null) {
      // console.log(result.pushToken);
      const serverPushToken = result.pushToken
      const filterByTokenClient = serverPushToken.filter(obj => obj.token != body.pushToken)
      console.log(filterByTokenClient);
      // res.send(filterByTokenClient)
      // const newPushToken = body.pushToken.concat(result.pushToken)
      const newData = {
        pushToken :  filterByTokenClient
      }
      User.update({email},{$set:newData}).then(updateRes => {
        res.send({succes:true,message:'succes update pushToken'})
      }).
      catch(err => {
        res.send({succes:false,message:err.errmsg})
      })
    }else {
      res.send({succes:false, message:'user not found'})
    }
  }).
  catch(err => {
    console.log(err);
    res.send({succes:false,message:err.errmsg})
  })


});

module.exports = router;


var sendNotification = function(data) {

  return new Promise((resolve, reject) => {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
        resolve(JSON.parse(data))
        // result.send(JSON.parse(data))
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
      resolve('error')
      // result.send('error on send notification')
    });

    req.write(JSON.stringify(data));
    req.end();
  })

};
