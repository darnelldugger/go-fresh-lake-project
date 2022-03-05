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
  // req.body.name = !!req.body.name
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

function edit(req, res) {
  Lake.findById(req.params.id)
  .then(lake => {
    res.render('lakes/edit', {
      lake,
      title: "Edit Lake"
    })
  })
}

function update(req, res) {
  Lake.findById(req.params.id)
  .then(lake => {
    if (lake.owner.equals(req.user.profile._id)) {
      lake.updateOne(req.body, {new: true})
      .then (()=> {
        res.redirect(`/lakes/${lake._id}`)
      })
    } else {
      throw new Error ('Not authorized to edit')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/lakes`)
})
}

export {
  index,
  newLake as new,
  create,
  show,
  edit,
  update,
}