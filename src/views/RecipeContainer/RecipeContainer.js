import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Grid, Row, Col} from 'react-bootstrap';
import './RecipeContainer.css';
import {mashapeKey} from '../../utils/keys.js';
import RecipeObject from '../RecipeObject/RecipeObject';

export default class RecipeContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}

	_getRecipes() {
		axios.defaults.headers.common['X-Mashape-Key'] = mashapeKey;
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
      <Grid className="recipes-content">
          <Row className="recipes-row">
              <Col xs={12}>
                  {this.state.recipes ? 
                      (this.state.recipes[0] ?
                          <h2 className="homepageTitles">Here are your recipes suggestions: </h2>
                          : <h2 className="homepageTitles">Sorry, there are no suggestions your ingredient(s).</h2>)
                      : ""
                  }
              </Col>
              {this.state.recipes ?  
                  this.state.recipes.map(recipe => <RecipeObject recipeObject={recipe} key={recipe.id}/>) :
                  ""
              }
          </Row>
      </Grid>
		);
	}
}

RecipeContainer.propTypes = {
	ingredients: PropTypes.array
};