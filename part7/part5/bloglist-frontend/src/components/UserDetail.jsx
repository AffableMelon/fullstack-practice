import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
