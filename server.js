const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

let uri = 'mongodb+srv://mvaleri:'+ process.env.PW + '@cluster0.jycfi.mongodb.net/exerciselog?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




const listener = app.listen(3000, () => {
  console.log('Your app is listening on port 3000')
})


let exerciseSessionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exerciseSessionSchema]
})

let Session = mongoose.model('Session', exerciseSessionSchema)
let User = mongoose.model('User', userSchema)



app.post('/api/exercise/new-user', bodyParser.urlencoded({ extended: false }) , (req, res) => { 
  let username = req.body['username']
  console.log(username)
  let newUser = new User({username: username})
  newUser.save((error, savedUser) => {
    if(!error) {
      let resObject = {}
      resObject.username = savedUser.username
      resObject.id = savedUser.id
      res.json(resObject)
    }
  })
})