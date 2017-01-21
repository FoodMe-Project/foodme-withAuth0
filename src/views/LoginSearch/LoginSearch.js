import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Ingredient from './../Ingredient/Ingredient';
import RecipesContainer from './../RecipesContainer/RecipesContainer';
import './LoginSearch.css';

export default class LoginSearch extends Component {
  
  constructor(props) {
    super(props);
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._deleteIngredient = this._deleteIngredient.bind(this);
    this.state = {
      userInput: "",
      ingredients:[]
    }
  }

  _handleButtonClick() {
    let userIngredientInput = this.refs.userInput.value;
    let ingredient = this.state.ingredients.concat(userIngredientInput);
    this.setState({
      ingredients: ingredient
    });
  }

  _deleteIngredient(i, e) {
    e.preventDefault();
    this.setState(state => {
        state.ingredients.splice(i, 1);
        return {
            ingredients: this.state.ingredients
        };
    });
  }

  render() {
    return (
      <div className="homepageDiv">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className="main-div">
            <p className="description">Having trouble finding what you would like to eat? No problem!
            FoodMe is a website that will help you find the perfect meal to prepare today.
            Just enter the list of ingredients you would like to use below, and let FoodMe suggest you recipes to make with these!</p>
            <h2 className="homepageTitles">Please enter your ingredients to begin.</h2>
            <div className="form">
                <form>
                  {this.state.recipes ? <p>scroll down to see what FoodMe found!</p> : ""}
                  <input ref="userInput" className="ingredientsInput" type="text" />
                  <Button className="button" onClick={this._handleButtonClick.bind(null, this)}>ADD INGREDIENT</Button>
                </form>
                <div className="ingredients">
                    {this.state.ingredients.map((ingredient, i) => 
                        <li key={i}>
                            <Ingredient ClassName="ingredient-list" ingredient={ingredient}  delete={(evt) => this._deleteIngredient(i, evt)}/>
                        </li>
                    )}
                </div>
            </div>
            <RecipesContainer ingredients={this.state.ingredients}/>
        </div>
    </div>
    );
  }
};