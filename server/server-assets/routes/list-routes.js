let router = require('express').Router()
let Lists = require('../models/list.js')

//change everything!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let baseRoute = '/boards/:boardId/lists'

//GET
router.get(baseRoute, (req, res, next) => {
  Lists.find({ authorId: req.session.uid, boardId: req.params.boardId })
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
  Lists.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT /:listId
router.put(baseRoute + '/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
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

//DELETE :listId
router.delete(baseRoute + '/:id', (req, res, next) => {
  Lists.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.remove(err => {
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