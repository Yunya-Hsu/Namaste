/* eslint-disable eqeqeq */
const compare = (a, b, options) => {
  return a == b ? options.fn(this) : options.inverse(this)
}

const canBook = (a, options) => {
  return a > 0 ? options.fn(this) : options.inverse(this)
}

module.exports = {
  compare,
  canBook
}
