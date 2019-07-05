const bcrypt = require('bcryptjs');

let helper = {
  generateHash: function (plainPassword) {
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash(plainPassword, salt);
    return hash
  },

  compareHash: function (plainPassword, password) {
    return bcrypt.compare(plainPassword, password);
  }
}

module.exports = helper