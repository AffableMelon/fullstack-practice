import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { vote } from "../reducers/blogreducer";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>read more</a>
      <p>author{blog.author}</p>
      <p>likes: {blog.likes}</p>
      <button
        onClick={() => {
          dispatch(vote(blog));
        }}
      >
        like
      </button>
    </div>
  );
};

export default BlogDetails;
