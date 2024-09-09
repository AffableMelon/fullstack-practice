// import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogreducer";
import { setNotif } from "../reducers/notifreducer";
// import { send } from "vite"

const MakeBlog = ({ sendBlog }) => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  // console.log(showAdd)
  const sndBlogRefactored = (e) => {
    e.preventDefault();
    const blog = {
      title: document.getElementById("Title").value,
      author: document.getElementById("Author").value,
      url: document.getElementById("Url").value,
      user: username,
    };
    dispatch(createBlog(blog));
    dispatch(setNotif(`Created ${blog.title}`, 3));
  };

  return (
    // <div>
    //     {
    //     showAdd ?  <div>
    //     <h2>Create new Blog</h2>
    //     <form onSubmit = {sendBlog}>
    //         <div>
    //             Title
    //             <input type='text' id='Title' ></input>
    //             Author
    //             <input type='text' id='Author'></input>
    //             Url
    //             <input type='text' id='Url'></input>
    //         </div>
    //         <button>submit</button>
    //     </form>
    //     <button onClick={()=> {setShowAdd(!(showAdd))}}>cancel</button>
    // </div>: <button onClick={() => {setShowAdd(!(showAdd));console.log(showAdd)}}>Add new blog </button>
    // }
    // </div>
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={sndBlogRefactored}>
        <div>
          <input
            type="text"
            data-testid="title"
            id="Title"
            placeholder="Title"
          ></input>
          <input
            type="text"
            data-testid="auth"
            id="Author"
            placeholder="Author"
          ></input>
          <input
            type="text"
            data-testid="url"
            id="Url"
            placeholder="URL"
          ></input>
        </div>
        <button>submit</button>
      </form>
      {/* <button onClick={()=> {setShowAdd(!(showAdd))}}>cancel</button> */}
    </div>
  );
};

export default MakeBlog;
