import { useDispatch, useSelector } from "react-redux";
import blogs from "../services/blogs";
import { deleteBlog, vote } from "../reducers/blogreducer";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = (props) => {
  const [lable, setLable] = useState("expand");
  const [details, setDetails] = useState(false);
  const dispatch = useDispatch();
  console.log(props);
  const username = useSelector((state) => state.user.username);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog.id));
  };
  const hadnleLike = (blog) => {
    dispatch(vote(blog));
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${props.blog.id}`}>
        {" "}
        <p> {props.blog.title} </p>{" "}
      </Link>
      {details ? (
        <div>
          <p>written by {props.blog.author}</p>
          <p>posted by {props.blog.user.username || props.blog.user}</p>
          <p>likes: {props.blog.likes}</p>
          <button onClick={() => hadnleLike(props.blog)}>like</button>
          {(props.blog.user.username === username ||
            props.blog.user === username) && (
            <button onClick={() => handleDelete(props.blog)}>delete</button>
          )}
          <button
            onClick={() => {
              setDetails(false);
              setLable("expand");
            }}
          >
            {lable}
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setDetails(true);
            setLable("collapse");
          }}
        >
          {lable}
        </button>
      )}
    </div>
  );
};

export default Blog;
