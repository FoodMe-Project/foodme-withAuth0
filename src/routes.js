import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import AuthService from './utils/AuthService';
import Container from './views/Container';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

const auth = new AuthService(process.env.REACT_APP_AUTH_TOKEN, process.env.REACT_APP_AUTH_ID);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export const makeRoutes = () => {

	return (
		<Route path=''>
			<Route path="/" component={Container} auth={auth}>
				<IndexRedirect to="/home" />
				<Route path="home" component={Home} onEnter={requireAuth}/>
				<Route path="login" component={Login}/>
				<Route path="access_token=:token" component={Login}/>
			</Route>
		</Route>
	);
};

export default makeRoutes;