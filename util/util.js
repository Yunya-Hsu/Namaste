const wrapAsync = fn => {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

const allBeNumber = (array) => {
  return array.some(item => isNaN(item))
}

const allBeBoolean = (array) => {
  return array.every(item => Number(item) === 1 || Number(item) === 0)
}

module.exports = {
  wrapAsync,
  allBeNumber,
  allBeBoolean
}
