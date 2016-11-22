import './GetRecipe.css';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import Ingredient from './../IngredientHomepage/IngredientHomepage';
import React from 'react';
import $ from 'jquery';
import RecipeObject from '../RecipeObject/RecipeObject';

var GetRecipe = React.createClass({
    getInitialState() {
        return {
            recipes: null,
            recipesId: null,
            userInput: "",
            isLoading: false,
            ingredients: [],
        };
    },
    _getRecipes(e) {
        e.preventDefault();
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
    _userInput(e) {
        e.preventDefault();
        this.setState({
            userInput: this.refs.userInput.value
        });
        this._getRecipes();
    },
    _handleButtonClick(e) {
        e.preventDefault();
        var userIngredientInput = this.refs.userInput.value;
        var ingredient = this.state.ingredients.concat(userIngredientInput);
        this.setState({
            ingredients: ingredient
        });
    },
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ingredients != this.state.ingredients) {
            this._getRecipes();
        }
    },
    deleteIngredient(i, e) {
        console.log(i);
        e.preventDefault();


        this.setState(state => {
            state.ingredients.splice(i, 1);
            return {
                ingredients: this.state.ingredients
            };
        });
    },
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
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
                    <div className="footerContacts">
                        <p>Contacts</p>
                        <p>Email</p>
                        <p>FAQ</p>
                        <p>About</p>
                    </div>
                    <div className="icons">
                        <ul className="social-icons">
                            <li className="social-icon">                  
                                <a href="www.facebook.com">
                                    <i className="fa fa-facebook"></i>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a href="www.twitter.com">
                                    <i className="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a href="www.instagram.com">
                                    <i className="fa fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="copyright">
                        <p>FoodMe© 2016</p>
                    </div>
                </footer>
            </div>
        );
    }
});

module.exports = GetRecipe;
