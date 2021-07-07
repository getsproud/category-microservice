import { Responder } from 'cote'
import { connect } from 'mongoose'

import findBy from './lib/findBy'
import findAllBy from './lib/findAllBy'
import createCategory from './lib/createCategory'
import deleteCategory from './lib/deleteCategory'
import updateCategory from './lib/updateCategory'

const PORT = 50051

const connectRetry = t => {
  let tries = t

  return connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .catch(e => {
      if (tries < 5) {
        tries += 1
        setTimeout(() => connectRetry(tries), 5000)
      }

      throw new Error(e)
    })
}

connectRetry(0)
  .then(() => {
    const responder = new Responder({
      name: 'Category Service', port: PORT, key: 'category'
    })

    responder.on('findBy', findBy)
    responder.on('findAllBy', findAllBy)
    responder.on('createCategory', createCategory)
    responder.on('deleteCategory', deleteCategory)
    responder.on('updateCategory', updateCategory)

    responder.on('liveness', () => new Promise(resolve => resolve(200)))
    responder.on('readiness', () => new Promise(resolve => resolve(200)))

    // eslint-disable-next-line
    console.log(`🤩 Category Microservice bound to port ${PORT}`)
  })
  .catch(e => {
    throw new Error(e)
  })
