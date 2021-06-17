import Category from '../models/category'

const deleteCategory = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'category',
    i18n: 'CATEGORY_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Category.findOneAndDelete(query).then(category => {
    if (!category) {
      message.i18n = 'CATEGORY_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'CATEGORY_DELETION_SUCCESS'
    message.code = 204

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default deleteCategory
