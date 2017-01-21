import React from 'react';
import Ingredient from './../Ingredient/Ingredient'
import './../Home/Home.css';

const QuickSearch = React.createClass({
	deleteQuickIngredient: function(i, event){
		event.preventDefault();
		this.props.deleteQuickIngredient(i);
	},

	render: function() {
		let searchArray = this.props.searchArray
		return (
		<div id="quick-search">	
		<button className="button" onClick={this.props.apiCall}>Search Recipes</button>
			<div id="ingredient-wrapper2">
				<ul>
					{
						searchArray.map((ingredient, i) => 
						<li key={i}>
							<Ingredient ingredient={ingredient} delete={evt => this.deleteQuickIngredient(i, evt)}/>
						</li>
						)
					}
				</ul>
			</div>
			
		</div>
		)
	}
})

module.exports = QuickSearch;


// blablabla