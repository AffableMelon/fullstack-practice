// import blogs from "../services/blogs"
import { useState } from 'react'
// import Togglable from './Toggable'
// import { useRef, forwardRef, useImperativeHandle } from "react"

const Blog = ({ blog, handleLike, currentUser, currentUID ,handleDel }) => {

  const [showDetail, setDetail] = useState(false)
  const [buttonlable, setButtonLable] = useState('expand')

  const getUsername = () => {
    if (blog.user.username) {
      return(blog.user.username)
    }else{
      return(currentUser)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle} data-testid = 'displayedblogs'>
      
      {blog.title} by {blog.author}
      {/* <Togglable buttonLabel='expand' hiddenButtonLabel='Hide'> */}

      {
        showDetail ? <div>
          <p>{blog.url}</p> <p>Current Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p> <p> Posted by: {getUsername()} </p>
          {currentUser === getUsername() ? <button onClick={() => handleDel(blog)}>delete</button> : <></>}
        </div> : <div> <button onClick = {() => {setDetail(!(showDetail)); setButtonLable('hide')}}>{buttonlable}</button></div>
      }
        
      {/* </Togglable> */}
    </div>
  )
}

export default Blog