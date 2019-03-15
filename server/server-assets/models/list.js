let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let Tasks = require('./task')


let schema = new Schema({
  listName: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE

schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id }),
    Tasks.remove({ boardId: this._id })
    //wont work on deleteMany, change to remove
  ])
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model(schemaName, schema)