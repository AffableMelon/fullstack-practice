// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword, login } from "../reducers/userreducer";

const Login = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <div>
      <h2>Log into app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
