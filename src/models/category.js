import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  label: {
    type: Schema.Types.String,
    required: true,
    minlength: 3
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  color: {
    type: Schema.Types.String
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Category = model('category', schema)

export default Category
