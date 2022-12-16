const connectFlash = (req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.successMessage = req.flash('successMessage')
  res.locals.loginUser = req.user || null
  next()
}

module.exports = connectFlash
