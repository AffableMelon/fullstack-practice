import { Link } from "react-router-dom";
const User = (props) => {
  console.log(props);

  return (
    <tr>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        <Link to={`/users/${props.user.id}`}>{props.user.name}</Link>
      </td>
      <td
        style={{
          padding: "8px",
          borderBottom: "1px solid #ddd",
          textAlign: "right",
        }}
      >
        {props.user.blogs.length}
      </td>
    </tr>
  );
};

export default User;
