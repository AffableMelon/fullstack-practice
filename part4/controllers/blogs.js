const blogRouter = require('express').Router()
const Blog = require('../models/blog');
const { error } = require('../utils/logger');
const { errorHandler } = require('../utils/middleware');
const User = require('../models/users')
const jwt = require('jsonwebtoken')


blogRouter.get("/", async (request, response) => {
  //   Blog.find({}).then((blogs) => {
  //     response.json(blogs);
  //   });
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
  });
  
blogRouter.post("/", async (request, response) => {
    // const getTokenFrom = request => {
    //   const auth = request.get('authorization')
    //   return((auth && auth.startsWith('Bearer ')) ? auth.replace('Bearer ', '') : null)
    // }
    try{
      // const tokenDecoded = jwt.verify(request.token, process.env.SECRET)
      // console.log(tokenDecoded)
      // if(!(tokenDecoded)){
      //   rep.status(401).json({
      //     error: 'inivalid token'
      //   })
      // }

      // const user = await User.findById(tokenDecoded.id)
      const user = request.user
      const blog = new Blog({
      title: request.body.title,
      url: request.body.url,
      author: request.body.author,
      likes: request.body.likes,
      user: user.id
      });
      // console.log(blog)
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog)
      await user.save()
      console.log(savedBlog)
      response.status(201).json(savedBlog)
    }catch(error) {
      console.log(error.message)
      errorHandler(error,request,response,null)
    }
    
  });
blogRouter.delete("/:id", async (req, rep) => {
  try{
    // const tokenDecoded = jwt.verify(req.token, process.env.SECRET)
    // if(!tokenDecoded){
    //   return rep.status(401).json({
    //     error: 'Invalid Token'
    //   }
    //   )
    // }
    const id = req.params.id
    // const user = await User.findById(tokenDecoded.id)
    const user = req.user
    const blog = await Blog.findById(id)
    if(!(blog)){
      return rep.status(404).json({
        error: 'no such blog!'
      })
    }
    if(user.id.toString() !== blog.user.toString()){
      return rep.status(401).json({
        error: 'user doesnt own this post'
      })
    }
    await Blog.findByIdAndDelete(id)
    rep.status(204).end()
  }catch (err) {
    errorHandler(err,req,rep,null);
  }
})

blogRouter.get('/:id', async (req, rep) => {
  try{
    const blog = await Blog.findById(req.params.id)
    rep.json(blog)
  }catch (err) {
    errorHandler(err,req,rep,(err) => {
      rep.status(404).end()
    })
  }  
})

blogRouter.put('/:id', async (req, rep) => {
  try{
    const user = req.user
    const id = req.params.id
    newBlog = {
      title: req.body.title,
      url: req.body.url,
      author: req.body.author,
      likes: req.body.likes
    }
    const blog = Blog.findById(id)
    if(user.id.toString() !== blog.user.toString()){
      return rep.status(401).json({
        error: 'user doesnt own this post'
      })
    }
    updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
    rep.json(updatedBlog)

  }catch(err){
    errorHandler(err, req, rep, (e) => {
      rep.status(500).end()
    })
  }
} )


module.exports = blogRouter