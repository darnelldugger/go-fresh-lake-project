import { Lake } from '../models/lake.js'

function index(req, res) {
  Lake.find({})
  .then(lakes => {
    res.render('lakes/index', {
      lakes,
      title: "Explore Lakes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/lakes')
  })
}

function newLake(req, res) {
  res.render('lakes/new', {
    title: "Enter a New Lake"
  })
  
}

function  create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.name = !!req.body.name
  Lake.create(req.body)
  .then(lake => {
    res.redirect('/lakes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/lakes/new')
  })
}

function show(req, res) {
  Lake.findById(req.params.id)
  .populate("owner")
  .then(lake => {
    res.render('lakes/show', {
      lake: lake,
      title: "Details"
    })
  })
}

export {
  index,
  newLake as new,
  create,
  show,
}