const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seedData = require('../models/seed.js')
const Baker = require('../models/baker.js')



// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(100).lean()
  res.render('index', {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page'
  })
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
  Baker.find()
  .then(foundBakers => {
    res.render('new', {
      bakers: foundBakers
    })
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})




// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy() 
        console.log(bakedBy)
        res.render('show', {
            bread: foundBread
        })
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
  .then(() => {
    res.redirect('/breads')
  })
  .catch(err => {
    console.log(err)
    res.send(err)
  })
})








module.exports = breads