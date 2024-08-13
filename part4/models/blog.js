const mongoose = require('mongoose')



const blogSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    user:
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
      }
  });
  
blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})
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