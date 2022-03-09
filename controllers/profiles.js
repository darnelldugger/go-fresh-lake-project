import { Profile } from '../models/profile.js'
import { Lake } from '../models/lake.js'
import { Fish } from '../models/fish.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles', {
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

function createPersonalBest(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.pbs.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function showPersonalBest(req, res) {
  console.log('profileId', req.params.profileId)
  console.log('pbId', req.params.pbId) 
  Profile.findById(req.params.profileId).then(profile => {
    const index = profile.pbs.findIndex(p => parseInt(p._id) === parseInt(req.params.pbId)
    )
    const pb = profile.pbs[index]
    res.render('profiles/personalbest/edit', {
      pb,
      title: 'Edit Personal Best'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}


function deletePersonalBest(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.pbs.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function update(req, res) {
  Profile.findById(req.user.profile._id).then(profile => {
    const index = profile.pbs.findIndex(p => parseInt(p._id) === parseInt(req.params.id)
    )
    profile.pbs[index].weight = req.body.weight
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  }
    


  // pbs.findById(req.params.id)
  // .then(pbs => {
  //   if(profile.pbs.equals(req.params.pbs_id)) {
  //     console.log(pbs)
  //     pbs.updateOne(req.body, {new: true})
  //     .then(() => {
  //       res.redirect(`profiles/${profile._id}`)
  //     })
  //   } else {
  //     throw new Error ('Not authorized')
  //   }
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect(`/profiles/${req.user.profile._id}`)
  // })





export {
  index,
  show,
  addLakeVisit,
  createPersonalBest,
  deletePersonalBest,
  showPersonalBest,
  update,
}