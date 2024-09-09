import { useSelector } from "react-redux";
import User from "./User";

const DisplayUsers = () => {
  const users = useSelector((state) => state.users);
  console.log(users);

  return (
    <div>
      {/* {users.map((user) => {
        // console.log(user);
        return <User key={user.id} user={user} />;
      })} */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              User
            </th>
            <th
              style={{
                textAlign: "right",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Number of Blogs
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUsers;
