import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {key} from '../../utils/mashapeKey.js';

export default class RecipeContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}

	_getRecipes() {
		axios.defaults.headers.common['X-Mashape-Key'] = key;
		axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.props.ingredients.toString()}&number=24&ranking=2&limitLicense=true`)
		.then(result => {
			this.setState({
				recipes: result.data
			});
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.ingredients !== this.props.ingredients) {
			this._getRecipes();
		};
	}

	render() {
		return (
				<div>
					<ul></ul>
				</div>
		);
	}
}

RecipeContainer.propTypes = {
	ingredients: PropTypes.array
};