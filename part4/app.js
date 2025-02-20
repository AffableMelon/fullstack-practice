const express = require("express");
const { MONGODB_URL } = require("./utils/config");
const { info, error } = require("./utils/logger");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const middleweare  = require('./utils/middleware')
const userRouter = require('./controllers/users');
const loginRouter = require("./utils/login");

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// const Blog = mongoose.model("Blog", blogSchema);


mongoose
  .connect(MONGODB_URL)
  .then((r) => {
    // console.log('connected succsesffullyy')
    info("succsess");
  })
  .catch((err) => {
    // console.log(err)
    error(err);
  });

app.use(cors());
app.use(express.json());


app.use(middleweare.requestLogger)

app.use(middleweare.getTokenFrom)



// app.use(middleweare.unknownEndpoint)
app.get('/', (req, rep) => {
  rep.send('<h1> Hello World </h1>')
})



//routers


app.use('/api/blogs', middleweare.identifyUser, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use( '/api/testing',testingRouter)
}

app.use(middleweare.unknownEndpoint)
app.use(middleweare.errorHandler)

module.exports = app



// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

// const PORT = 3003
