import Category from '../models/category'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'category',
    i18n: 'CATEGORY_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Category.findOne(query).exec().then(category => {
    message.data = category

    if (!category) {
      message.i18n = 'CATEGORY_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'CATEGORY_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy
