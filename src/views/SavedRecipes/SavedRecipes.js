const React = require('react');
import styles from './../Recipes/Recipes.css';
import IndividualSavedRecipe from '../IndividualSavedRecipe/IndividualSavedRecipe.js';


const SavedRecipes = React.createClass({

	render: function() {
		let recipes = this.props.recipes

		return (
			<ul>
				{recipes.map((recipe) =>
				<li key={recipe.recipeId} className="recipe-list">
					<IndividualSavedRecipe 
					className="recipes-list" 
					recipeId={recipe.recipeId} 
					recipes={recipes}
					deleteSavedRecipe={this.props.deleteSavedRecipe}
					/>
				</li>
				)}
			</ul>
		)
	}
})

module.exports = SavedRecipes;
