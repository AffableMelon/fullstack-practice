const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require('../models/users')
const { get } = require("lodash");
const blog = require("../models/blog");
const assert = require("node:assert");
const jst = require("jsonwebtoken")
// const expect = require('node:expect')

const api = supertest(app);

let header
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const newUser = {
      name: 'root',
      username: 'rootTest',
      password: 'password',
      blogs: []
    }
    await api.post('/api/users').send(newUser)
    const tokenized = await api.post('/api/login').send(newUser)
    header = {'Authorization': `Bearer ${tokenized.body.token}`}
  })

describe('basic tests', () => {
 const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];   

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObj = new Blog(blog);
    await blogObj.save();
  }
});

test("test amount of entries initialy", async () => {
  const blogs = await api.get("/api/blogs");

  assert.strictEqual(blogs.body.length, initialBlogs.length);
});

test("get from database test", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id is defined test", async () => {
  const blogs = await api.get("/api/blogs");
  blogs.body.forEach((blog) => {
    assert.strictEqual(blog.hasOwnProperty('id'), true);
  });
});

test.only('get a specific value from the db', async () => {
    const toGetBlog = initialBlogs[0]
    const blog = await api.get(`/api/blogs/${toGetBlog._id}`).expect(200).expect('Content-Type', /application\/json/)

    assert(blog.body, toGetBlog)

})

})

describe('POST tests', () => {
  let header
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const newUser = {
      name: 'root',
      username: 'rootTest',
      password: 'password'
    }
    await api.post('/api/users').send(newUser)
    const tokenized = await api.post('/api/login').send(newUser)
    header = {'Authorization': `Bearer ${tokenized.body.token}`}
  })
    test('post a blog', async () => {
            const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
        }
        await api.post('/api/blogs')
        .send(newBlog) 
        .set(header)
        .expect(201)
        .expect('Content-Type',/application\/json/)

        const resp = await api.get('/api/blogs')
        const titles = resp.body.map(
            blog =>  (blog.title)
        ) 
        // console.log(titles)
        const check = resp.body.length > 0

        assert(check, true)
        assert(titles.includes('TDD harms architecture'))

    })

    test('post with no likes', async () => {
        const blogObj = {
            url:'1234',
            title:'this is title',
            author:'this is author'
        }

        await api.post('/api/blogs')
                 .send(blogObj)
                 .set(header)
                 .expect(201)
                 .expect('Content-Type', /application\/json/)
        const resp =await api.get('/api/blogs')

        resp.body.forEach(blog => {
            assert.strictEqual(blog.likes, 0)
        })

    })
     
    test('posting bad blog results in error 400', async () => {
        const badBlog = {
            author: 'abcd1234'
        }

        await api.post('/api/blogs').send(badBlog).set(header).expect(400)

        const resp = await api.get('/api/blogs')

        assert.strictEqual(resp.body.length, 0)
    })
})


describe('DELETE /api/blogs/:id', () => {
  let initialBlog;

  beforeEach(async () => {
    await Blog.deleteMany({});
    initialBlog = { title: 'Test Blog', author: 'Hezikiale', url: '123jasdf.com', likes: 0 };
    await api.post('/api/blogs').send(initialBlog).set(header).expect(201).expect('Content-Type', /application\/json/)
  });

  test.only('successfully deletes a blog post', async () => {
    const blogs = await Blog.find()
    const deleteBlog = blogs.find(blogs => blogs.title === initialBlog.title)
    // await api.delete(`/api/blogs/${deleteBlog._id}`).set({'Authorization': `Bearer {tokenized.body.token}`}).expect(401);
    await api.delete(`/api/blogs/${deleteBlog._id}`).set(header).expect(204);

    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.length, 0)
  });

  test.only('returns 400 when trying to delete a non-existing blog', async () => {
    const nonExistentId = 7;
    await api.delete(`/api/blogs/${nonExistentId}`).set(header).expect(400);
  });

  // test.only('returns user doesnt own 401 when header isnt the right one', async () => {
    
  //   await api.delete(`/api/blogs/${deleteBlog._id}`).set({'Authorization': `Bearer {tokenized.body.token}`}).expect(401);
  // })
});





after(async () => {
  await mongoose.connection.close();
});
