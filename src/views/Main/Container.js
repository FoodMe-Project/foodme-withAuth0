import React, { PropTypes } from 'react'
import { Jumbotron } from 'react-bootstrap'
import styles from './styles.module.css'

export class Container extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div>
        <Jumbotron>
          {children}
        </Jumbotron>
        <Jumbotron>
          <p>Some random text</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Container;
