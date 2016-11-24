import React, { PropTypes, Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import styles from './Home.css';
import grid from '../grid.css';
import Fridge from './../Fridge/Fridge';
import SavedRecipes from './../SavedRecipes/SavedRecipes';
import QuickSearch from './../QuickSearch/QuickSearch';
import Ingredient from './../Ingredient/Ingredients';
import Recipes from './../Recipes/Recipes';
import Collapsible from 'react-collapsible';


var axios = require('axios');
var $ = require('jquery');


export class Home extends Component {

	static contextTypes = {
		router: PropTypes.object
	}

	static propTypes = {
		auth: PropTypes.instanceOf(AuthService)
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			profile: props.auth.getProfile(),
			recipes: [],
			recipesId: null,
			ingredients: [],
			quickSearch: [],
			fridgeId: null,
			savedRecipes: [],
			showSearch: true,
			showSaved: false
		}
    
		props.auth.on('profile_updated', (newProfile) => {
			this.setState({profile: newProfile})
		})
	}

	logout(){
		this.props.auth.logout()
		this.context.router.push('/login');
	}
  
	_apiCall() {
		var that = this;
		$.ajax({
			url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=` + this.state.quickSearch.toString() + "&number=12",
			type: 'GET',
			data: {},
			dataType: 'json',

			success: function(data) {
				that.setState({
					recipes: data,
					recipesId: data.id
				});
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
			}
		});
	}
    
	componentDidMount() {
		this.getClientFridgeId();
		this.displaySavedRecipe();
	}
    
	_handleButtonClick (userIngredientInput) {
		var that = this;
		axios.post(`http://localhost:4000/insert-into-fridge`, {
			fridgeId: that.state.fridgeId,
			ingredientName: userIngredientInput
		})
		.then(result => {
			that.displayFridge();
		})
		.catch(err => {
			console.log(err.stack);
		})
	}
   
	deleteIngredient(i, ingredient) {
		event.preventDefault();
		var that = this;

		axios.post('http://localhost:4000/delete-ingredient', {
			fridgeId: that.state.fridgeId,
			ingredientName: ingredient
		})
		.then(result => {
			that.displayFridge();
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	deleteQuickIngredient(i){
		event.preventDefault();

		this.setState(state => {
			state.quickSearch.splice(i, 1);
			return {
				quickSearch: this.state.quickSearch
			};
		});
	}

	deleteSavedRecipe(recipeId){
   		axios.post('http://localhost:4000/delete-recipe/', {
   			clientId: this.state.profile.user_id,
   			recipeId: recipeId,
   		})
   		.then(result => {
   			this.setState({
   				savedRecipes: this.state.savedRecipes.filter(r => r.recipeId !== recipeId)
   			});
   		})
   		.catch(err => {
   			console.log(err.stack);
   		})
	}

	saveUserRecipe(recipeId) {
		axios.post(`http://localhost:4000/insert-save-recipe`, {
	        clientId: this.state.profile.user_id,
	        recipeId: recipeId
        })
        .then(result => {
          	this.setState({
          		savedRecipes: this.state.savedRecipes.concat({user_id: this.state.profile.user_id, recipeId: recipeId})
          	});
        })
        .catch(err => {
          console.log(err.stack);
        })
	}

	copyIngredient(i) {
		event.preventDefault();
		this.setState(state => {
			var copied = state.ingredients.slice(i, i+1);
			var ingredient = copied.concat(this.state.quickSearch);
			return {
				quickSearch: ingredient
			}
		})
	}
	getClientFridgeId() {
		var that = this;

		axios.post(`http://localhost:4000/get-fridge/${this.state.profile.user_id}`)
		.then(result => {
			that.setState({
				fridgeId: result.data.fridgeId
			})
			that.displayFridge();
		})
		.catch(err => {
			console.log(err.stack)
		})
	}

	displayFridge() {
		var that = this;

		axios.post(`http://localhost:4000/display-fridge/${this.state.fridgeId}`)
		.then(result => {
			let fridge = result.data;
			var fridgeDisplayed = fridge.map(ingredientObj => {
				return ingredientObj.name;
			})
			that.setState({
				ingredients: fridgeDisplayed
			})
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	displaySavedRecipe() {
		var that = this;

		axios.post(`http://localhost:4000/display-recipes/${this.state.profile.user_id}`)
		.then(result => {
			that.setState({
				savedRecipes: result.data
			})
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	toggleSearch() {
		if (!this.state.showSearch) {
			this.setState({
				showSearch: true,
				showSaved: false
			})
		}
	}

	toggleSaved() {  
		if (!this.state.showSaved) {
			this.setState({
				showSearch: false,
				showSaved: true
			})
		}
	}

	render() {
		const { profile } = this.state;
		var fridgeOpen = <span><i className="material-icons">kitchen</i><i className="material-icons">close</i></span>;
        var fridgeClosed = <span><i className="material-icons">kitchen</i><i className="material-icons">arrow_forward</i></span>;
		return (
			<div className={styles.root} className={grid.root} id="home-wrapper">
				<Jumbotron id="sidebar-nav" className="col-large-3">
					<div id="foodme-logo">
						<h2>FoodMe.</h2>
					</div>
					<div className="user-info">
						<img className="user-image" src={profile.picture} alt="user's profile"/>
						<p id="welcome">Welcome {profile.nickname}!</p>
						<Button id="logout-button" onClick={this.logout.bind(this)}>Logout</Button>
					</div>
					<div className="dividing-line" />
					<div id="nav-buttons">
					
						<button onClick={this.toggleSearch.bind(this)}>Search For Recipes</button>
						<button onClick={this.toggleSaved.bind(this)}>Saved Recipes</button>
					
					</div>
					<div className="dividing-line" />
					<footer id="footer-content">
						<a>Contact</a>
						<a>FAQ</a>
						<p>FoodMe. 2016</p>
					</footer>
				</Jumbotron>
				<div id="recipe-and-fridge" className="col-large-9">
					<Collapsible 
                	trigger={fridgeClosed} 
                	triggerWhenOpen={fridgeOpen}
                	open={true}   
                	>
					<Fridge
						ingredientsArray={this.state.ingredients} 
						apiCall={this._apiCall.bind(this)}
						componentDidMount={this.componentDidMount.bind(this)}
						handleButtonClick={this._handleButtonClick.bind(this)}
						componentDidUpdate={this.componentDidUpdate}
						deleteIngredient={this.deleteIngredient.bind(this)}
						copyIngredient={this.copyIngredient.bind(this)}
					/>
					<div id="vertical-line" />
					<QuickSearch
						searchArray={this.state.quickSearch}
						deleteQuickIngredient={this.deleteQuickIngredient.bind(this)}
						apiCall={this._apiCall.bind(this)}
					
					/>
					</Collapsible>
					{this.state.showSearch ? 
						<section id="recipe-container" >
							<Recipes
								clientId={this.state.profile.user_id} 
								recipes={this.state.recipes}
								saveUserRecipe={this.saveUserRecipe.bind(this)}
								deleteSavedRecipe={this.deleteSavedRecipe.bind(this)}
							/>
						</section> 
					: null}
					{this.state.showSaved ?
						<SavedRecipes id="recipe-container"
						recipes={this.state.savedRecipes}
						deleteSavedRecipe={this.deleteSavedRecipe.bind(this)}
						/>
					: null}
					
				</div>
				
			</div>
		);
	}
}


export default Home;

