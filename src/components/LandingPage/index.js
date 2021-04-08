import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { MainPage } from '../MainPage';
import ProfilePage from '../ProfilePage';
import { LoginPage } from './LoginPage';
import '../../css/main.css';
const isLoggedIn = localStorage.getItem('token');

console.log(isLoggedIn);
export const LandingPage = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={LoginPage} />
        <Route exact path={['/ProfilePage', '/ProfilePage/:id']}>
          <ProfilePage />
        </Route>
        <Route exact path="/">
          {isLoggedIn ? <MainPage /> : <Redirect to="/Login" />}
        </Route>
      </Switch>
    </Router>
  );
};
