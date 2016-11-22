import './GetRecipe.css';
import {
    Button,
    Grid,
    Row,
    Col
}
from 'react-bootstrap';
import Ingredient from './../IngredientHomepage/IngredientHomepage'

var React = require('react');
var $ = require('jquery');
var RecipeObject = require('../RecipeObject/RecipeObject');

var GetRecipe = React.createClass({
    getInitialState: function() {
        return {
            recipes: null,
            recipesId: null,
            userInput: "",
            isLoading: false,
            ingredients: [],
        };
    },
    _getRecipes: function(e) {
        e.preventDefault();
        var searchItem = this.refs.userInput.value;
        var self = this;
        $.ajax({
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.state.ingredients.toString()}&number=24&ranking=1&limitLicense=true`,
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
    _handleButtonClick: function(e) {
        e.preventDefault();
        var userIngredientInput = this.refs.userInput.value;
        var ingredient = this.state.ingredients.concat(userIngredientInput);
        this.setState({
            ingredients: ingredient
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevProps.ingredients != this.state.ingredients) {
            this._getRecipes();
        }
    },
    deleteIngredient: function(i, e) {
        console.log(i);
        e.preventDefault();


        this.setState(state => {
            state.ingredients.splice(i, 1);
            return {
                ingredients: this.state.ingredients
            };
        });
    },
    render: function() {
        let isLoading = this.state.isLoading;
        return (
            <div>
                <div className="main-div">
                    <p className="description">Having trouble finding what you would like to eat? No problem!
                    FoodMe is a website that will help you find the perfect meal to prepare today.
                    Just enter the ingredients you would like to use by adding them to your list of ingredients you 
                    have home or that you want to use, and let FoodMe suggest you recipes to make with these!</p>
                    <h2 className="insert-ingredients">Please enter your ingredients to begin.</h2>
                    <form className="form">
                        {this.state.recipes ? <p>scroll down to see your results!</p> : ""}
                        <input ref="userInput" className="ingredientsInput" type="text" />
                        <Button className="add-ingredient" onClick={this._handleButtonClick.bind(this)}>ADD INGREDIENT</Button>
                        <Button bsStyle="primary" onClick={this._getRecipes} className="add-ingredient">SEARCH</Button>
                        <div className="ingredients">
                            {this.state.ingredients.map((ingredient, i) => 
                                <li key={i}>
                                    <Ingredient ClassName="ingredient-list" ingredient={ingredient}  onClick={(evt) => this.deleteIngredient(i, evt)}/>
                                </li>
                            )}
                        </div>
                    </form>
                    <Grid className="recipes-content">
                        <Row className="recipes-row">
                            <Col xs={12}>
                                {this.state.recipes ?
                                    <h2 className="recipeSuggestionTitle">Here are the recipe suggestions for {this.refs.userInput.value}: </h2> : ""
                                }
                                {this.state.recipesId ?
                                    <h2>Sorry, there are no suggestions for {this.refs.userInput.value}</h2> : ""
                                    
                                }
                            </Col>
                            {this.state.recipes ?  
                                this.state.recipes.map(recipe => <RecipeObject recipeObject={recipe} key={recipe.id}/>) :
                                ""
                            }
                        </Row>
                    </Grid>
                    <main>
                        {this.props.children}
                    </main>
                </div>
                <footer className="footer">
                    <p>Contacts</p>
                    <p>Email</p>
                    <p>Got recipe ideas? Tell us!</p>
                    <p>About</p>
                    <hr/>
                    <ul class="social-icons">
                        <li class="social-icon">                  
                            <a href="www.facebook.com">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li class="social-icon">
                            <a href="www.twitter.com">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li class="social-icon">
                            <a href="www.instagram.com">
                                <i class="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        );
    }
});

module.exports = GetRecipe;
