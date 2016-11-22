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
       console.log(this.props.id)
       console.log(typeof this.props.id)

   //     var self = this;
   //     $.ajax({
			// url:﻿⁠⁠⁠⁠ `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.id}/information﻿⁠⁠⁠⁠`,
   //         type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
   //         data: {}, // Additional parameters here
   //         dataType: 'json',
   //         success: function(data) {
   //             self.setState({
   //                 recipeInfo: data,
   //             });
   //         },
   //         error: function(error) {
   //         	console.log(error)
   //         },
   //         beforeSend: function(xhr) {
   //         xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
   //         }
   //     });
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