import { useMutation } from '@apollo/client';
import { useForm } from './useForm';
import { useEffect } from 'react';
import { LOGIN_USER } from 'graphql/func';
import { useSnackbar } from 'notistack';
import Loading from 'components/common/Loading';

export const LoginPage = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, handleChange] = useForm({ email: '', password: '' });
  const [
    loginUser,
    { data: loginData, error, loading },
  ] = useMutation(LOGIN_USER, { fetchPolicy: 'no-cache' });
  const handleLogin = () => {
    console.log('Hi');
    loginUser({ variables: data });
  };

  useEffect(() => {
    if (loginData?.LoginUser) {
      enqueueSnackbar(`Login successful`, {
        variant: 'success',
        preventDuplicate: true,
      });
      localStorage.setItem('token', `Bearer ${data.LoginUser.token}`);
    }
    if (error) {
      console.log({ error: error.message });
    }
  }, [loginData, error]);
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
          {!loading ? (
            <button onClick={handleLogin} className="btn btn-login">
              Login
            </button>
          ) : (
            <Loading sm/>
          )}
        </div>
      </div>
    </div>
  );
};
