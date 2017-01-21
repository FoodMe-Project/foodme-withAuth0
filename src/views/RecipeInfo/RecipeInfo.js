import React, {Component, PropTypes} from 'react';

export default class RecipeInfo extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>{this.props.recipeObject.name} ({this.props.recipeObject.amount} {this.props.recipeObject.unitLong})</li>
        </ul>
      </div>
    );
  }
}

RecipeInfo.propTypes = {
  recipeObject: PropTypes.object
}