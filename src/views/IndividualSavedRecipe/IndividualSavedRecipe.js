const React = require('react');
const $ = require('jquery');
const axios = require('axios');
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
		const self = this;
		$.ajax({
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information/`,
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

   	deleteSavedRecipe: function() {
   		axios.post('http://localhost:4000/delete-recipe/', {
   			clientId: this.props.clientId,
   			recipeId: this.props.recipeId,
   		})
   		.then(result => {
   			console.log(result);
   		})
   		.catch(err => {
   			console.log(err.stack);
   		})
   	},

	render: function() {

		return (
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button" onClick={this.deleteSavedRecipe}><i id="favourite-button" className="material-icons 24md">clear</i></button>
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