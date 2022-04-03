const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  cardTitle: {
    type: String,
    required: [true, 'Please Enter Card Title'],
    minLength: [1, 'Card Title Should have More Than 1 Characters'],
    maxLength: [210, 'Card Title Cannot Exceed 210 Characters'],
  },
  description: {
    type: String,
    default: '',
    maxLength: [600, 'Card Description Cannot Exceed 600 Characters'],
  },
  label: [
    {
      id: { type: Number, required: true },
      textLabel: { type: String, required: true },
      bgLabel: { type: String, required: true }
    }
  ],
  coverImage: {
    public_id: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

CardSchema.pre('remove', async function (next) {
  this.model('List').findByIdAndUpdate(this.listId, { $pull: { cardOrder: this._id } }, next)
})

module.exports = mongoose.model('Card', CardSchema)