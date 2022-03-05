import { Fish } from '../models/fish.js'

function index(req, res) {
  Fish.find({})
  .then(fishes => {
    res.render('fishes/index', {
      fishes,
      title: "Explore Fish"
    })
  })
}

function newFish(req, res) {
 Fish.find({}, function (err, fishes) {
   res.render('fishes/new', {
     title: 'Add Fish To This Site',
     fishes: fishes,
   })
 })
}

export {
  index,  
  newFish as new,
}