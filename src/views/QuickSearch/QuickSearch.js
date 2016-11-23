import React from 'react';
import QuickSearchIngredient from './../Ingredient/QuickSearchIngredient'

const QuickSearch = React.createClass({
	deleteQuickIngredient: function(i, event){
		event.preventDefault();
		this.props.deleteQuickIngredient(i);
	},
	render: function() {
		let searchArray = this.props.searchArray
		let searchATest = ["hi","there","array"];
		console.log('quicksearch', searchArray)

		return (
			<div id="ingredient-wrapper">
				<ul>
					{
						searchArray.map((ingredient, i) => 
						<li key={i}>
							<QuickSearchIngredient ingredient={ingredient} onClick={evt => this.deleteQuickIngredient(i, evt)}/>
						</li>
						)
					}
				</ul>
				
				<button onClick={this.props.apiCall}>Search Recipes</button>
			</div>
		)
	}
})

module.exports = QuickSearch;


// blablabla