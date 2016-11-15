import React, { PropTypes, Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import styles from './Home.css'

export class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
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
          <p>The components for the user page go here (views/Home/Home.js)</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Home;
