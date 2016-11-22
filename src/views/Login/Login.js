import React, { PropTypes, Component } from 'react';
import {Button} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import './Login.css';
import GetRecipe from '../GetRecipe/GetRecipe';
import { Link } from 'react-router';

export class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="page">
        <header className="header">
          <div className="foodMeLogin">
            <h1><Link to="/" className="foodMe">foodMe.</Link></h1>
            <Button className="loginButton" bsStyle="primary" onClick={auth.login.bind(this)}>LOGIN</Button>
          </div>
        </header>
        <div className="ingredients-recipes">
          <GetRecipe/>
        </div>
      </div>
    );
  }
}

export default Login;

