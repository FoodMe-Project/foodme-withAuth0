import React, {Component} from 'react';
import Ingredient from './../Ingredient/Ingredient'
import './../Home/Home.css';

export default class QuickSearch extends Component {
  
  _deleteQuickIngredient(i, e) {
    e.preventDefault();
    this.props.deleteQuickIngredient(i);
  }

  render() {
    return (
      <div id="quick-search"> 
        {!this.props.searchArray[0] ?
          <p id="quick-search-text">Click on one or several of your ingredient's name to start searching for recipes</p>
          : <ul>
            {this.props.searchArray.map((ingredient, i) => 
              <li key={i}>
                <Ingredient ingredient={ingredient} delete={evt => this._deleteQuickIngredient(i, evt)}/>
              </li> 
            )}
          </ul>
        }
      </div>
    );
  }
};