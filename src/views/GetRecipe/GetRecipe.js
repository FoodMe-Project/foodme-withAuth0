var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var Recipes = require('./RecipeObject');

var GetRecipe = React.createClass({
    getInitialState: function() {
        return {
            recipes: null,
            recipesId: null,
            userInput: "",
        };
    },
    _getRecipes: function(e) {
        e.preventDefault();
        var searchItem = this.refs.userInput.value;
        console.log(searchItem);
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
        return (
            <div className="main-app">
                <header className="main-header">
                    <h1><Link to="/">FoodMe</Link></h1>
                </header>
                <main className="main-content">
                <p>USER LOGIN/SIGN UP</p>
                <p>Having trouble to find what to eat today? No problem!
                FoodMe is a website that will help you to find what to prepare today.
                Just enter your main ingredient that you have home and let FoodMe do his work!</p>
                <h2>Please enter an ingredient to begin.</h2>
                <form>
                    <input ref="userInput" className="homepage__input" type="text" />
                    <button onClick={this._getRecipes} className="homepage__button">Search</button>
                </form>
                    <ul>
                        {this.state.recipes ?
                            <h2>Here are the recipe suggestions for {this.refs.userInput.value}:</h2> : ""
                        }
                        {this.state.recipesId ?
                            <h2>Sorry, there are no suggestions for {this.refs.userInput.value}</h2> : ""
                            
                        }
                        {this.state.recipes ?  
                            this.state.recipes.map(recipe => <Recipes recipeObject={recipe} key={recipe.id}/>) :
                            ""
                        }
                    </ul>
                </main>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = GetRecipe;

