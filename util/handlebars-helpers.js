/* eslint-disable eqeqeq */
const compare = (a, b, options) => {
  return a == b ? options.fn(this) : options.inverse(this)
}

module.exports = {
  compare
}
