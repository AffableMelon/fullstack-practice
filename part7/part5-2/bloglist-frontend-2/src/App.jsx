import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
// import blogService from "./services/blogs";
// import Login from "./services/login";
import LoginBuild from "./components/Login";
import MakeBlog from "./components/MakeBlog";
import Togglable from "./components/Toggable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlog } from "./reducers/blogreducer";
import Notification from "./components/Notification";
import { logout } from "./reducers/userreducer";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { initUsers } from "./reducers/userSreducer";
import DisplayUsers from "./components/DisplayUsers";
import UserDetail from "./components/UserDetail";
import BlogDetails from "./components/BlogDetails";

const App = () => {
  const dispatch = useDispatch();
  // const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  // const [blog, setBlog] = useState(null)
  // const [message, setMessage] = useState(null)
  // const likeRef = useRef()
  // const [showAdd, setShowAdd] = useState(false)
  const blogAddFormRef = useRef();

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: "16px 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
  };
  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    marginLeft: "16px",
    fontSize: "16px",
  };

  useEffect(() => {
    dispatch(initializeBlog());
    dispatch(initUsers());
  }, [dispatch]);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUsername(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const sendBlog =  (blog) => {
  //   // e.preventDefault()

  //   try{
  //     // const blog = {
  //     //       title: document.getElementById('Title').value,
  //     //       author: document.getElementById('Author').value,
  //     //       url: document.getElementById('Url').value
  //     //     }
  //     //     console.log(blog)
  //     //     setBlog(blog)

  //     setMessage('Succsess added ' + blog.title + ' by ' + blog.author)
  //     // setShowAdd(false)
  //     setTimeout( () => {
  //       setMessage(null)
  //     }, 2500)
  //     blogAddFormRef.current.toggleVisibility()
  //     blogService.create(blog).then(r => {
  //       console.log(r)
  //       setBlogs(blogs.concat(r))
  //     })

  //   }catch (e) {
  //     console.log(e)
  //     setMessage('Womp womp that failed')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 2500)
  //   }

  // }

  // const handleDel = async (blog) => {
  //   if (window.confirm(`Youre going to delete ${blog.title}`)) {
  //     const id = blog.id;
  //     await blogService.remove(id);
  //     setBlogs(blogs.filter((blog) => blog.id !== id));
  //   }
  // };

  // const handleLike = async (blog) => {
  //   // const blog = likeRef.current.getLikedBlog();
  //   const id = blog.id
  //   const thisname = blog.user.username
  //   const updateBlog = {
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes + 1
  //   }
  //   let reply = await blogService.update(updateBlog,id)
  //   reply.user = {
  //     username: thisname
  //   }
  //   const updatedBlogs = (blogs.map(blog => {
  //     if (blog.id === reply.id) {
  //       return(reply)
  //     }else{
  //       return(blog)
  //     }
  //   }))

  //   setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))

  // }

  // const blogAdd = () => {

  //   return(
  //     <div>
  //       <div>
  //         <p> logged in as {user.username} <button onClick = {() => {window.localStorage.clear(); setUser(null)}}> logout </button> </p>
  //       </div>
  //       <Togglable buttonLabel='create new blog' hiddenButtonLabel='cancel' ref = {blogAddFormRef}>
  //         <MakeBlog sendBlog={sendBlog} />
  //       </Togglable>

  //       {/* <h2>Create new Blog</h2>
  //       <form onSubmit = {sendBlog}>
  //         <div>
  //           Title
  //           <input type='text' id='Title' ></input>
  //           Author
  //           <input type='text' id='Author'></input>
  //           Url
  //           <input type='text' id='Url'></input>

  //         </div>
  //         <button>submit</button>
  //       </form> */}

  //       {
  //         console.log(blogs)
  //       }

  //       <h2>blogs</h2>
  //       {
  //         blogs.map(blog =>
  //           <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDel = {handleDel} currentUser = {user.username}/>
  //         )}
  //     </div>
  //   )
  // }

  // const loginForm = () => {

  //   return (
  //     <div>
  //       <h2>Log into app</h2>
  //       <form onSubmit={handleLogin}>
  //         <div>
  //         username
  //           <input
  //             type="text"
  //             value={username}
  //             name="Username"
  //             onChange={({ target }) => {setUsername(target.value)}}
  //           />
  //         </div>
  //         <div>
  //         password
  //           <input
  //             type="password"
  //             value={password}
  //             name="Password"
  //             onChange={({ target }) => setPassword(target.value)}
  //           />
  //         </div>
  //         <button type="submit">login</button>
  //       </form>
  //     </div>
  //   )
  // }

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   console.log('activated', username, password)

  //   try{
  //     console.log(username, password)
  //     const user = await Login.login({
  //       username, password
  //     })

  //     window.localStorage.setItem(
  //       'loggedBlogUser', JSON.stringify(user)
  //     )

  //     blogService.setToken(user.token)
  //     setUser(user)
  //     console.log(user)
  //     setUsername('')
  //     setPassword('')
  //     setMessage('Login succsess!')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 2500)
  //   }catch (e){
  //     console.log(e)
  //     setMessage('wrong creds')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 2500)
  //   }
  // }
  const user = useSelector((state) => state.user);
  // console.log(window.localStorage);
  if (!user.token) {
    return (
      <div>
        <LoginBuild />
      </div>
    );
  }
  return (
    <div>
      <Notification />
      <div style={navbarStyle}>
        <Link style={linkStyle} to="/users">
          Users
        </Link>
        <Link style={linkStyle} to="/">
          {" "}
          Blogs{" "}
        </Link>
        <div>
          logged in as {user.username}{" "}
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            {" "}
            logout{" "}
          </button>
        </div>
      </div>
      <div>
        <h2>Blogs</h2>
        <div>
          <Togglable
            buttonLabel="create new blog"
            hiddenButtonLabel="cancel"
            ref={blogAddFormRef}
          >
            <MakeBlog sendBlog={() => console.log("helo")} />
          </Togglable>
          <Routes>
            <Route path="/users" element={<DisplayUsers />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
          {/* <Blogs /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
