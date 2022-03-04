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

export {
  index
}