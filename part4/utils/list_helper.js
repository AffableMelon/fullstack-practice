const ld = require("lodash");

const dummy = (blog) => {
  return 1;
};

const totalLikes = (arrayBlog) => {
  return arrayBlog.reduce((p, q) => {
    return (p += q.likes);
  }, 0);
};

const favouriteBlog = (arrayBlog) => {
  currentMaxLike = 0;
  const favblog = {
    title: "",
    author: "",
    likes: 0,
  };
  arrayBlog.forEach((p) => {
    if (p.likes > currentMaxLike) {
      currentMaxLike = p.likes;
      favblog.title = p.title;
      favblog.author = p.author;
      favblog.likes = p.likes;
    }
  });
  return favblog;
};

const mostBlogs = (blogs) => {
  const author = ld.maxBy(blogs, (blog) => {
    return blog.author;
  });
  count = 0
  blogs.map((b) => {
      if (b.author === author.author){
         count += 1;
      }
    })
  return {
    author: author.author,
    blogs: count
  };
};

const mostlikes = (blogs) =>{
    const authorLikes = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0 ) + blog.likes
        return(likes) 
    }, {})
    const likeAuthor = ld.transform(authorLikes, (result, value, key) => {
        (result[value] || (result[value] = [])).push(key)
    }, {})

    maxLike = ld.max(ld.values(authorLikes))
    return(
        {
            author: likeAuthor[maxLike][0],
            likes: maxLike
        }
    )
}

module.exports = {
  totalLikes,
  mostBlogs,
  favouriteBlog,
  dummy,
  mostlikes,
};
