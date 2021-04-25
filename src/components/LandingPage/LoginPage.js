import { useForm } from './useForm';

export const LoginPage = (props) => {
  const [data, handleChange] = useForm({ email: '', password: '' });

  const handleLogin = () => {
    console.log({ values: data });
  };
  return (
    <div className="login-page">
      <div className="circle-1">
        <div className="circle-2">
          <h1>LOGIN</h1>
          <input
            type="email"
            className="form-control-input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-control-input"
            placeholder="Password"
            onChange={handleChange}
          />
          <button onClick={handleLogin} className="btn btn-login">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
