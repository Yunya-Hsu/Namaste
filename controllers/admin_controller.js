const studio = {
  name: 'Namaste',
  backgroundColor: '#F8F6F5',
  logo: '/namaste/namaste_logo.png'
}

const renderCreateStudioPage = (req, res) => {
  res.render('super_admin/studio', { studio })
}

const createStudio = async (req, res) => {

}

module.exports = {
  renderCreateStudioPage,
  createStudio
}
