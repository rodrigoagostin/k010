const Friend = require('../models/friend');
var sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false,
  devPort: 25 // Default: False
});

exports.getList = function(req, res, next) {
  Friend.find({}, function(err, friends) {
    if (err) return next(err);
    res.json(friends);
  })
}

exports.updateFriend = function(req, res, next) {
  if (req.params.id !== req.body._id) {
    return res.status(422).send({ error: 'Id inválido' });
  }
  Friend.findOneAndUpdate({_id: req.body._id}, req.body, function(err, friend) {
    if (err && err.codeName === "DuplicateKey")
      return res.status(422).send({ error: 'Email em uso.' });
    res.json(friend);
  });
}

exports.deleteFriend = function(req, res, next) {
  Friend.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err)
      return res.status(422).send({ error: 'Não foi possível remover.' });
    res.json({status: 'ok'});
  });
}

exports.save = function(req, res, next) {
  const email = req.body.email;
  const name  = req.body.name;

  if (!email || !name) {
    return res.status(422).send({ error: 'Campos inválidos.'});
  }

  Friend.findOne({ email: email }, function(err, existingFriend) {
    if (err) { return next(err); }

    if (existingFriend) {
      return res.status(422).send({ error: 'Email em uso.' });
    }

    const friend = new Friend({
      email: email,
      name : name
    });

    friend.save(function(err) {
      if (err) { return next(err); }
      res.json(friend);
    });

  });
}

exports.restart = function(req, res, next) {
    Friend.remove({}, function(err) {
    if (err) return next(err);
    res.json({status: 'ok'});
  })
}

exports.bingo = function(req, res, next) {
  var newList = [];
  Friend.find({}, function(err, friends) {
    var count = 0;
    // shuffle list
  	while (count < friends.length) {
  		var item = friends[Math.floor( Math.floor(Math.random()*friends.length))];
  		if (newList.indexOf(item) == -1) {
  			newList.push(item);
  			count++;
  		}
  	}

    //set friend and send mail
    for (var i = 0; i < newList.length; i++) {

      let histFriend;
      if (newList.length-1 == i) {
        histFriend = newList[0].name;
      } else {
        histFriend = newList[i+1].name;
      }

      const newFriend = new Friend({
        _id    : newList[i]._id,
        email  : newList[i].email,
        name   : newList[i].name,
        friend : histFriend
      });

      //update and send mail
      Friend.findOneAndUpdate({_id: newFriend._id}, newFriend, function(err, resFriend) {
        sendmail({
          from: 'friendship@friendship.com',
          to: resFriend.email,
          subject: 'Parabéns vc foi sorteado na Friendship!',
          html: 'Seu amigo(a) é o(a) : <h3> ' + resFriend.friend + '</h3>',
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
        });
      });
    }
    res.json({status: 'ok'});
  });
};
