import { Profile } from '../models/profile.js'
import { Lake } from '../models/lake.js'
import { Fish } from '../models/fish.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Explore Anglers"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('lagoon')
  .populate('pisces')
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      Lake.find({_id: {$nin: profile.lagoon}}, function(err, lakes) {
        res.render("profiles/show", {
          title: `Angler ${profile.name}'s profile`,
          profile,
          isSelf,
          lakes,
      })
      })
    })
  })

  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function addLakeVisit(req, res){
  Profile.findById(req.params.id, function(err, profile) {
    profile.lagoon.push(req.body.lakeId)
    profile.save(function(err) {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
}

function createPb(req, res){
  Profile.findById(req.params.id, function(err, profile) {
    profile.personalBest.push(req.body)
    profile.save(function(err) {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
}


export {
  index,
  show,
  addLakeVisit,
  createPb,
}