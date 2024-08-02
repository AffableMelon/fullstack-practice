const mongoose = require('mongoose')



const blogSchema = new mongoose.Schema({

    title: String,
    author: String,
    url: String,
    likes: Number,
  });
  
//   const Blog = mongoose.model("Blog", blogSchema);
//   mongoose
//     .connect(MONGODB_URL)
//     .then((r) => {
//       // console.log('connected succsesffullyy')
//       info("succsess");
//     })
//     .catch((err) => {
//       // console.log(err)
//       error(err);
//     });

module.exports = mongoose.model('Blog', blogSchema)