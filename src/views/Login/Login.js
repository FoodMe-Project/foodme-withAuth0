import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import GetRecipe from '../GetRecipe/GetRecipe';

import './Login.css';

export class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const {auth} = this.props;
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
            <footer className="footer">
              <div className="footerContacts">
                <p>Contacts</p>
                <p>Email</p>
                <p>FAQ</p>
                <p>About</p>
              </div>
              <div className="icons">
                  <ul className="social-icons">
                      <a href="#" className="social-icon">
                          <li>                  
                              <i className="fa fa-facebook"></i>
                          </li>
                      </a>
                      <a href="#" className="social-icon">
                          <li>
                              <i className="fa fa-twitter"></i>
                          </li>
                      </a>
                      <a href="#" className="social-icon">
                          <li>
                              <i className="fa fa-instagram"></i>
                          </li>
                      </a>
                  </ul>
              </div>
              <div className="copyright">
                  <p>FoodMe© 2016</p>
              </div>
          </footer>
      </div>
    );
  }
}

export default Login;

