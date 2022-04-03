const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema({
  boardTitle: {
    type: String,
    required: [true, 'Please Enter Board Title'],
    minLength: [1, 'Board Title Should have More Than 1 Characters'],
    maxLength: [60, 'Board Title Cannot Exceed 60 Characters'],
    trim: true
  },
  listOrder: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: true
    }
  ],
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  background: {
    type: String,
    required: true
  },
  isStar: {
    type: Boolean,
    default: false
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

BoardSchema.pre('remove', async function (next) {
  this.model('List').deleteMany({ boardId: this._id }, next)
  this.model('Card').deleteMany({ boardId: this._id }, next)
})

module.exports = mongoose.model('Board', BoardSchema)