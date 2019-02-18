const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    minlength: [3, `Minimum name length is 3`]
  },
  email: {
    type: String,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      isAsync: true,
      validator: function(val, cb){
        User.
          findOne({
            email: val,
            id: {$ne: this._id}
          })
          .then(data => {
            (data) ? cb(false) : cb(true)
          })
          .catch(err => {
            cb(false)
          })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, `Minimum passsword length is 6`]
  }
})

userSchema.pre('save', function(next) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next()
})

const User = mongoose.model(`User`, userSchema)

module.exports = User;