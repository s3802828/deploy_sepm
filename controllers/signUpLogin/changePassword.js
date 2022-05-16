var userModel = require('../../models/user').user;

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

exports.changePassword = function (req, res) {
  userModel.findById({ _id: mongoose.Types.ObjectId(req.params.id) }, function (error, result) {
    if (error) {
      return console.log(error)
    }
    if (result) {
      if (!bcrypt.compareSync(req.body.oldPassword, result.password)) {

        return res.send({ message: "Wrong password. Please try again!" })

      } else {
        userModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
          password: bcrypt.hashSync(req.body.password, 8)
        }, function (err, result) {
          if (err) {
            return res.send(err)
          }
          res.send(result)
        })
      }
    }
  })
};

exports.addAdmin = function (req, res) {
  userModel.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync("csfunction1234!", 8),
    userType: ['user', 'admin']
  }, function (error, result) {
    if (error) {
      return res.send(error)
    }
    res.send(result)
  })
}