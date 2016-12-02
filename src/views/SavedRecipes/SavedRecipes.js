const React = require('react');
import './../Recipes/Recipes.css';
import './../Home/Home.css'
import IndividualSavedRecipe from '../IndividualSavedRecipe/IndividualSavedRecipe.js';


const SavedRecipes = React.createClass({

	render: function() {
		let recipes = this.props.recipes

		if (!recipes) {
			return <h3>Loading ... </h3>
		}
		else {
			return (
				<div id="recipe-container">
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
				</div>
			);
		}
	}
})

module.exports = SavedRecipes;
