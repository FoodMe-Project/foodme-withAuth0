import './RecipeObject.css';
import {Button, Thumbnail, Col} from 'react-bootstrap';

var React = require('react');
var $ = require('jquery');
var RecipesOtherIngredients = require('../RecipeInfo/RecipeInfo');

var RecipeObject = React.createClass({
    propTypes: {
        recipeObject: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            recipesInfo: null,
            recipesOtherIngredients: null,
            recipesServings: null,
            recipesUrl: null,
            recipesInstructions: null,
            showResults: false
        };
    },
    onClick: function(e) {
        var evt = e;
        this.setState({ 
            showResults: !this.state.showResults
        });
        this._getRecipesURL(evt)
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
                console.log(data)
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
            <Col xs={6} md={4}>
            <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet"/>
                <Thumbnail className="eachRecipe" src={this.props.recipeObject.image} alt="242x200">
                    <h3 className="recipeTitle">{this.props.recipeObject.title.toUpperCase()}</h3>
                    <Button bsStyle="primary" className="moreInfo" onClick={this.onClick}>QUICK VIEW</Button>
                     {!this.state.showResults ? "" :
                        <div className="ingredientsList">
                            {this.state.recipesOtherIngredients ? <h4 className="recipeTitles">Ingredients needed:</h4> : "" }
                            <ul>
                                {this.state.recipesOtherIngredients ?  
                                    this.state.recipesOtherIngredients.map(recipeOtherIngredients => <RecipesOtherIngredients recipeObject={recipeOtherIngredients} key={recipeOtherIngredients.id}/>) :
                                    ""
                                }
                            </ul>
                        {this.state.recipesServings ? <h4 className="recipeTitles">Gives: {this.state.recipesServings} serving(s)</h4> : ""}
                        {this.state.recipesInstructions? <h4 className="recipeTitles">Steps to follow:</h4> : "" }
                        <div className="steps">
                            {this.state.recipesInstructions === "" ? 
                                <h5 className="noInstructions">No need for instructions for this one!</h5> : 
                                <div dangerouslySetInnerHTML={{__html: this.state.recipesInstructions}}/>
                            }
                            {this.state.recipesUrl ? <Button bsStyle="primary" className="moreInfo" href={this.state.recipesUrl}>MORE INFO</Button>: ""}
                            </div>
                        </div>
                    }
                </Thumbnail>
            </Col>
        );
    }
});

module.exports = RecipeObject;