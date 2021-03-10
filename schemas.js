const ReviewSchema = {
  author: { type: String, minLength: 2 },
  date: { type: String },
  body: { type: String },
  rating: { type: Number, min: 0.5, max: 5 }
}

const MovieSchema = {
  watch_number: { type: Number },
  title: { type: String },
  director: { type: String },
  actors: { type: String },
  poster: { type: String },
  synopsis: { type: String },
  reviews: [ReviewSchema]
}

const UserSchema = {
  sub: { type: String },
}

module.exports = { ReviewSchema, MovieSchema, UserSchema }
