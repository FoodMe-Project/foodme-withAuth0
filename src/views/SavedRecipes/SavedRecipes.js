const React = require('react');
import styles from './../Recipes/Recipes.css';
import IndividualSavedRecipe from '../IndividualSavedRecipe/IndividualSavedRecipe.js';


const SavedRecipes = React.createClass({
	render: function() {
		let recipes = this.props.recipes

		return (
			<ul>
				{recipes.map((recipe, i) =>
				<li key={i} className="recipe-list">
					<IndividualSavedRecipe className="recipes-list" recipeId={recipe.recipeId} clientId={this.props.clientId}/>
				</li>
				)}
			</ul>
		)
	}
})

module.exports = SavedRecipes;
