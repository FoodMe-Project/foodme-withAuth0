import React, { PropTypes, Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import './Container.css'

export class Container extends Component {
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
      </div>
    )
  }
}

export default Container;
