import React, {Component} from 'react';
import styles from './Ingredient.css';

export default class Ingredient extends Component {
  render() {
    return (
      <div className={styles.root}>
        <form id="add-ingredient-input">
          {this.props.copy ? 
            <text onClick={this.props.copy}>{this.props.ingredient}</text>
            : <text>{this.props.ingredient}</text>
          }
          <button onClick={this.props.delete}>x</button>
        </form>
      </div>
    );
  }
};