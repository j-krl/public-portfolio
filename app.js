// Database login info has been removed from public display

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const schema = require('./schemas')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//------------------------------------------------------------------------------
// Database
//------------------------------------------------------------------------------

mongoose.connect('mongodb+srv://XXXXX:YYYYYY@cluster0.todsz.mongodb.net/ZZZZZ?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// mongoose.connect('mongodb://localhost/users', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("database is   W I R E D   I N")
})

const movieSchema = new mongoose.Schema(schema.MovieSchema)
const Movie = mongoose.model('movies', movieSchema, 'movies')
//const reviewSchema = new mongoose.Schema(schema.ReviewSchema)
//const Review = mongoose.model('reviews', reviewSchema, 'movies')
//const userSchema = new mongoose.Schema(schema.UserSchema)
//const User = mongoose.model('users', userSchema)

//------------------------------------------------------------------------------
// Custom Middleware
//------------------------------------------------------------------------------

async function movieListGet(res) {
    let movie_list = {}
    await Movie.find((err, data) => {
        if (err) return 'error returning collection'
        movie_list = data
    })
    await res.json(movie_list)
}

//async function movieListPost(watch_number, review, res) {
    //let movie = {}
    //const new_post = new Review(review)
    //await Movie.findOne({ watch_number: watch_number }, (err, data) => {
        //if (err) return 'error finding movie in collection'
        //movie = data
    //})
    //movie.reviews.push(new_post)
    //movie.markModified('reviews')
    //movie.save()
    //await res.json([new_post])
//}

//------------------------------------------------------------------------------
// Routes
//------------------------------------------------------------------------------

app.get('/movies', (req, res) => {
    movieListGet(res)
})

//app.post('/submit/:watch_number', (req, res) => {
    //movieListPost(req.body.watch_number, req.body.review, res)
//})

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

//------------------------------------------------------------------------------
// Port Connection
//------------------------------------------------------------------------------

app.listen(3000, () => console.log(`Server started on port 3000`))

