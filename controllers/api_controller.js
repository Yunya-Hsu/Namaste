// models
const Api = require('../models/api_model')

const search = async (req, res, next) => {
  const { category, keyword } = req.query
  if (!category || !keyword) {
    return res.status(404).json({
      error: 'without category or keyword'
    })
  }

  let result
  if (category === 'address') {
    result = await Api.search(keyword, 'studios', category)
  }

  return res.json({ data: result })
}

module.exports = {
  search
}
