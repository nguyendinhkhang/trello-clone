const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  listTitle: {
    type: String,
    required: [true, 'Please Enter List Title'],
    minLength: [1, 'List Title Should have More Than 1 Characters'],
    maxLength: [210, 'List Title Cannot Exceed 210 Characters'],
    trim: true
  },
  cardOrder: [
    {
      type: Schema.Types.ObjectId,
      required: true
    }
  ],
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

ListSchema.pre('remove', async function (next) {
  this.model('Board').findByIdAndUpdate(this.boardId, { $pull: { listOrder: this._id } }, next)
  this.model('Card').deleteMany({ listId: this._id }, next)
})

module.exports = mongoose.model('List', ListSchema)