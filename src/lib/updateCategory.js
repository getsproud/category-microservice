import Category from '../models/category'

const updateCategory = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'category',
    i18n: 'CATEGORY_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Category.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(category => {
    if (!category) {
      message.i18n = 'CATEGORY_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'CATEGORY_UPDATE_SUCCESS'
    message.code = 200
    message.data = category

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateCategory
