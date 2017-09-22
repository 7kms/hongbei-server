import mongoose from 'mongoose'
import crypto from 'crypto'

const schema = new mongoose.Schema({
    wechatInfo: {},
    address:{
      type: Array,
      default: []
    }
},{ collection: 'user' ,timestamps: true});

// const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */

// schema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password || this.hashed_password;
//   });

/**
 * Validations
 */
// schema.path('username').validate(function (username) {
//   return username && username.length;
// }, 'Username cannot be blank');

// schema.path('hashed_password').validate(function (hashed_password) {
//   return hashed_password && hashed_password.length && this._password.length;
// }, 'Password cannot be blank');

/**
 * Pre-save hook
 */
// schema.pre('save', function (next) {
//   if (!validatePresenceOf(this.password)) {
//     next(new Error('Invalid password'));
//   } else {
//     next();
//   }
// });


/**
 * Methods
 */

schema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};
  

schema.statics = {
  async getProfile (obj){
    return await admin.findOne(obj);
  }
}
const admin = mongoose.model('User', schema);

export default admin;