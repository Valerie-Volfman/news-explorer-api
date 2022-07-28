const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const CentralError = require('../errors/central-error')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (data) => {
      validator.isEmail(data);
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new CentralError(401, 'Authorization Required');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new CentralError(401, 'Authorization Required');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
