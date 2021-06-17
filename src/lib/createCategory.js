import Category from '../models/category'

const createCategory = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'category',
    i18n: 'CATEGORY_CREATION_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Category.create(query).then(category => {
    message.i18n = 'CATEGORY_CREATION_SUCCESS'
    message.code = 200
    message.data = category

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default createCategory
