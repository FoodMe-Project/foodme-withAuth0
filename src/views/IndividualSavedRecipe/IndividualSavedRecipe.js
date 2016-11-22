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
		let id = this.props.id
       this._getRecipes(id);
   	},

   _getRecipes: function(id) {
		console.log(id)

		var self = this;

		$.ajax({
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/` + id + `/information﻿⁠⁠⁠⁠/`,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
			   self.setState({
			       recipeInfo: data,
			   });
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
				}
			});
   		},

	render: function() {

		console.log(this.state.recipeInfo)

		return (
			<div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button" ><i id="favourite-button" className="material-icons 24md">stars</i></button>

            </div>
            <div className="seperating-line">
            </div>
            <h2>Hello</h2>
         
            <div id="read-more-wrapper">
                <button id="read-more">See Recipe</button>
            </div>    
        	</div>
		)
	}
})

module.exports = IndividualSavedRecipe;

                // <img src={this.state.recipes.image} alt="recipe representation"/>