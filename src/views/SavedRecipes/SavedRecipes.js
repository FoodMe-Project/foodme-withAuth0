const React = require('react');
import styles from './../Recipes/Recipes.css';
import IndividualSavedRecipe from '../IndividualSavedRecipe/IndividualSavedRecipe.js';


const SavedRecipes = React.createClass({
	render: function() {

		let recipes = this.props.recipes
		console.log(recipes)



		return (
			<ul>
				{recipes.map((recipe, i) => 
				<li key={i} className="recipe-list">
					<IndividualSavedRecipe className="recipes-list" id={recipe.recipeId}/>
				</li>
				)}
			</ul>
		)
	}
})

module.exports = SavedRecipes;
