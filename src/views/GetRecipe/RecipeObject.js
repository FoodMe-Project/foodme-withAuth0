var React = require('react');
var $ = require('jquery');
var RecipesOtherIngredients = require('./RecipeInfo');

var RecipeObject = React.createClass({
    propTypes: {
        recipeObject: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            recipesInfo: null,
            recipesOtherIngredients: null,
            recipesServings: null,
            recipesUrl: null
        };
    },
    _getRecipesURL: function(e) {
        e.preventDefault();
        var self = this;
        $.ajax({
            url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeObject.id}/information`,
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
            dataType: 'json',
            success: function(data) {
                self.setState({
                    recipesInfo: data,
                    recipesInstructions: data.instructions,
                    recipesOtherIngredients: data.extendedIngredients,
                    recipesServings: data.servings,
                    recipesUrl: data.sourceUrl
                });
            },
            beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
            }
        });
    },
    render: function() {
        return (
            <div>
                <h3>{this.props.recipeObject.title} (Recipe ID: {this.props.recipeObject.id})</h3>
                <img src={this.props.recipeObject.image}/>
                <p onClick={this._getRecipesURL}>Click here for more informations about this recipe!</p>
                {this.state.recipesOtherIngredients ? <h4>Ingredients needed:</h4> : "" }
                <ul>
                    {this.state.recipesOtherIngredients ?  
                        this.state.recipesOtherIngredients.map(recipeOtherIngredients => <RecipesOtherIngredients recipeObject={recipeOtherIngredients} key={recipeOtherIngredients.id}/>) :
                        ""
                    }
                </ul>
                {this.state.recipesServings ? <h4>Gives: {this.state.recipesServings} serving(s)</h4> : ""}
                {this.state.recipesInstructions? <h4>Steps to follow:</h4> : "" }
                {this.state.recipesInstructions === "" ? 
                    <h5>No need for instructions for this one ;)</h5> : 
                    <div dangerouslySetInnerHTML={{__html: this.state.recipesInstructions}}/>
                }
                {this.state.recipesUrl ? <h4>For more informations, please click on this link: <a href={this.state.recipesUrl}>{this.state.recipesUrl}</a></h4> : ""}
            </div>
        );
    }
});

module.exports = RecipeObject;


