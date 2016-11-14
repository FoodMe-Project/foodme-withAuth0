import React, { PropTypes as T } from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import AuthService from '../../../utils/AuthService'
import styles from './styles.module.css'
import { Link } from 'react-router'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div className={styles.root}>
        <Jumbotron>
          <h2>Home</h2>
          <p>Welcome {profile.nickname}!</p>
          { console.log(profile) }
          <Button onClick={this.logout.bind(this)}>Logout</Button>
        </Jumbotron>
        <Jumbotron>
          <Link to='random'>Go to random</Link>
        </Jumbotron>
      </div>
    )
  }
}

export default Home;
