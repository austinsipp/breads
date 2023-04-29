const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seedData = require('../models/seed.js')



// INDEX
breads.get('/', (req, res) => {
    Bread.find()
      .then(foundBreads => {
        res.render('Index',
      {
        breads: foundBreads,
        title: 'Index Page'
      }
    )
      })
    
  // res.send(Bread)
})

//seed
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedData )
    .then(createdBreads => {
      res.redirect('/breads')
    })
})





// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id) 
    .then(foundBread => { 
      res.render('edit', {
        bread: foundBread 
      })
    })
})



// SHOW
breads.get('/:arrayIndex', (req, res) => {
  Bread.findById(req.params.arrayIndex)
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})



// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedBread => {
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.id}`)
  })
})



// DELETE

breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })
})





// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})








module.exports = breads