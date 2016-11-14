import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import styles from './Login.css'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
      </div>
    )
  }
}

export default Login;
