import './GetRecipe.css';
import {Button} from 'react-bootstrap';


var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var Recipes = require('../RecipeObject/RecipeObject');

var GetRecipe = React.createClass({
    getInitialState: function() {
        return {
            recipes: null,
            recipesId: null,
            userInput: "",
            isLoading: false
        };
    },
    _getRecipes: function(e) {
        e.preventDefault();
        var searchItem = this.refs.userInput.value;
        var self = this;
        $.ajax({
            url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${searchItem}`,
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
            dataType: 'json',
            success: function(data) {
                self.setState({
                    recipes: data,
                    recipesId: data.id
                });
            },
            beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
            }
        });
    },
    _userInput: function(e) {
        e.preventDefault();
        this.setState({
            userInput: this.refs.userInput.value
        });
        this._getRecipes();
    },
    render: function() {
        let isLoading = this.state.isLoading;
        return (
            <div className="main-div">
            <link href="https://fonts.googleapis.com/css?family=Josefin+Slab" rel="stylesheet"/>
                <div className="main-content">
                <p className="description">Having trouble finding what you would like to eat? No problem!
                FoodMe is a website that will help you find the perfect meal to prepare today.
                Just enter the ingredients you would like to use (separated by comas) and let FoodMe suggest you recipes to make with these!</p>
                <h2 className="insert-ingredients">Please enter your ingredients to begin.</h2>
                <form>
                    <input ref="userInput" className="ingredientsInput" type="text" />
                    <Button bsStyle="primary" onClick={this._getRecipes} className="searchButton">Search</Button>
                </form>
                </div>
                <div className="recipes-content">
                    {this.state.recipes ?
                        <h2>Here are the recipe suggestions for {this.refs.userInput.value}: </h2> : ""
                    }
                    {this.state.recipesId ?
                        <h2>Sorry, there are no suggestions for {this.refs.userInput.value}</h2> : ""
                        
                    }
                    {this.state.recipes ?  
                        this.state.recipes.map(recipe => <Recipes recipeObject={recipe} key={recipe.id}/>) :
                        ""
                    }
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = GetRecipe;

