

const Login = ({ username, setUsername, setPassword, handleLogin, password }) => {
  return(
    <div>
      <h2>Log into app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid='username'
            value={username}
            name="Username"
            onChange={({ target }) => {setUsername(target.value)}}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login