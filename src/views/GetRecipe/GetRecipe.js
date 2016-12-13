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
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.state.ingredients.toString()}&number=24&ranking=2&limitLicense=true`,
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
    _userInput() {
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
        if (prevProps.ingredients !== this.state.ingredients) {
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
            <div className="homepageDiv">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="main-div">
                    <p className="description">Having trouble finding what you would like to eat? No problem!
                    FoodMe is a website that will help you find the perfect meal to prepare today.
                    Just enter the list of ingredients you would like to use below, and let FoodMe suggest you recipes to make with these!</p>
                    <h2 className="homepageTitles">Please enter your ingredients to begin.</h2>
                    <form className="form">
                        {this.state.recipes ? <p>scroll down to see what FoodMe found!</p> : ""}
                        <input ref="userInput" className="ingredientsInput" type="text" />
                        <Button className="button" onClick={this._handleButtonClick.bind(null, this)}>ADD INGREDIENT</Button>
                        <Button bsStyle="primary" onClick={this._getRecipes} className="button">SEARCH</Button>
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
                                    (this.state.recipes[0] ?
                                        <h2 className="homepageTitles">Here are your recipes suggestions: </h2>
                                        : <h2 className="homepageTitles">Sorry, there are no suggestions your ingredient(s).</h2>)
                                    : ""
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
                            <a href="www.facebook.com" className="social-icon">
                                <li>                  
                                    <i className="fa fa-facebook"></i>
                                </li>
                            </a>
                            <a href="www.twitter.com" className="social-icon">
                                <li>
                                    <i className="fa fa-twitter"></i>
                                </li>
                            </a>
                            <a href="www.instagram.com" className="social-icon">
                                <li>
                                    <i className="fa fa-instagram"></i>
                                </li>
                            </a>
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
