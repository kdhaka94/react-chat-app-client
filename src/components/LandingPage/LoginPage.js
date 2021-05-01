import { useMutation } from '@apollo/client';
import { useForm } from './useForm';
import gpl from '../../graphql';
import { useEffect } from 'react';
export const LoginPage = (props) => {
  const [data, handleChange] = useForm({ email: '', password: '' });
  // const [loginUser, { data: loginData, error, loading }] = useMutation(
  //   LOGIN_USER
  // );
  const handleLogin = () => {
    console.log({ gpl }, 'Hello');
    console.log('Hi');
    // loginUser({ variables: data });
  };
  // useEffect(() => {
  //   if (loginData?.LoginUser) {
  //     console.log({ loginData });
  //   }
  //   if (error) {
  //     console.log({ error });
  //   }
  // }, [loginData, error]);
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
