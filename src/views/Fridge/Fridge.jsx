import React, {Component} from 'react';
import './../Home/Home.css';
import './../grid.css'

import Ingredient from './../Ingredient/Ingredient';

export default class Fridge extends Component {
  constructor(props) {
    super(props);
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._copyIngredient = this._copyIngredient.bind(this);
    this._deleteIngredient = this._deleteIngredient.bind(this);
  }

  _handleButtonClick(event) {
    event.preventDefault(); 
    let userIngredientInput = this.refs.userInput.value;
    this.props.handleButtonClick(userIngredientInput);
  }

  _copyIngredient(i, event) {
    event.preventDefault();
    this.props.copyIngredient(i);
  }

  _deleteIngredient(i, event, ingredient) {
    event.preventDefault();
    this.props.deleteIngredient(i, ingredient);
  }

  render() {
    return (
      <div id="fridge-and-search">
        <section id="fridge" >
          <form id="submit-wrapper">       
              <input id="input-ingredient" type="text" ref="userInput" ></input>
              <button id="add-ingredient" onClick={this._handleButtonClick}>-></button>
          </form>
          <div id="ingredient-wrapper">
              {this.props.ingredientsArray.map((ingredient, i) => 
              <li key={i}>
                  <Ingredient ClassName="ingredient-list" 
                    ingredient={ingredient}  
                    copy={(evt) => this._copyIngredient(i, evt)}
                    delete={(evt) => this._deleteIngredient(i, evt, ingredient)}/>
              </li>
              )}
          </div>
        </section>
      </div>
    );
  }
};