let router = require('express').Router()
let Tasks = require('../models/task.js')

let baseRoute = '/boards/:boardId/lists/:listId/tasks'

//GET all tasks
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

//GET all comments for tasks
router.get(baseRoute + '/:taskId/comments', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid, boardId: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST to create new task
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

//PUT /:taskId, for tasks
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

//Put to create new comment tied to a task
router.put(baseRoute + '/:taskId/comments', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  req.body.listId = req.params.listId
  req.body.taskId = req.params.taskId
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments.push(req.body)
      task.save()
      res.send(task)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//DELETE :taskId, for tasks
router.delete(baseRoute + '/:id', (req, res, next) => {
  Tasks.findOne({ _id: req.params.id, authorId: req.session.uid })
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

//DELETE :commentId for comments
router.delete(baseRoute + '/:id/comments/:commentId', (req, res, next) => {
  Tasks.findOne({ _id: req.params.id, authorId: req.session.uid })
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.comments.forEach((c, index) => {
        if (c._id.toString() == req.params.commentId) {
          task.comments.splice(index, 1)
        }
      })
      task.save(err => {
        if (err) {
          return res.status(400).send(err)
        }
        res.send("Successfully Deleted")
      })
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})


module.exports = router