const React = require('react');
var $ = require('jquery');
import styles from './../IndividualRecipes/IndividualRecipes.css'

const IndividualSavedRecipe = React.createClass({
	getInitialState() {
		return {
			recipeInfo: {} 
		}
	},

	componentDidMount: function() {
		this._getRecipes();
   	},

   _getRecipes: function() {
		var self = this;

		$.ajax({
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.id}/information/`,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
			   self.setState({
			       recipeInfo: data,
			   });
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "l1LBB0jz0wmshpT2AzWw4K1uUb6ep1oXuBdjsnQWcgGs9Iutw8");
				}
			});
   		},

	render: function() {

		console.log(this.state.recipeInfo)

		return (
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button"><i id="favourite-button" className="material-icons 24md">stars</i></button>
                <img src={this.state.recipeInfo.image} alt="recipe representation"/>
            </div>
            <div className="seperating-line">
            </div>
            <h2>{this.state.recipeInfo.title}</h2>
         
            <div id="read-more-wrapper">
                <button id="read-more">See Recipe</button>
            </div>    
        </div>
		)
	}
})

module.exports = IndividualSavedRecipe;

                // <img src={this.state.recipes.image} alt="recipe representation"/>