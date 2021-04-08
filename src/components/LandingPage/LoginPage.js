export const LoginPage = (props) => {
  return (
    <div className="login-page">
      <div className="circle-1">
        <div className="circle-2">
          <h1>LOGIN</h1>
          <input type="email" className="form-control-input" placeholder="Email"/>
          <input type="password" className="form-control-input" placeholder="Password"/>
          <button type="submit" className="btn btn-login">Login</button>
        </div>
      </div>
    </div>
  );
};
