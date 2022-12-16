/* eslint-disable eqeqeq */
const compare = (a, b, options) => {
  return a == b ? options.fn(this) : options.inverse(this)
}

const canBook = (a, options) => {
  return a > 0 ? options.fn(this) : options.inverse(this)
}

const oneOnOne = (a, b, options) => {
  return a == 1 && b == 1 ? options.fn(this) : options.inverse(this)
}

const live = (a, b, options) => {
  return a == 1 && b != 1 ? options.fn(this) : options.inverse(this)
}

const toJson = (obj, options) => {
  return JSON.stringify(obj)
}

module.exports = {
  compare,
  canBook,
  oneOnOne,
  live,
  toJson
}
