let router = require('express').Router()
let Tasks = require('../models/task.js')

let baseRoute = '/boards/:boardId/lists/:listId/tasks'

//GET
router.get(baseRoute, (req, res, next) => {
  Tasks.find({ authorId: req.session.uid, boardId: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post(baseRoute, (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT /:taskId
router.put(baseRoute + '/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE :taskId
router.delete(baseRoute + '/:id', (req, res, next) => {
  Tasks.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
      })
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})


module.exports = router