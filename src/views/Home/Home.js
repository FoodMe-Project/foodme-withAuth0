import React, { PropTypes, Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import styles from './Home.css';
import grid from '../grid.css';
import Ingredient from './../Ingredient/Ingredients';
import RecipeOutput from './../Recipes/Recipes';
import Collapsible from 'react-collapsible';

var $ = require('jquery');


export class Home extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile(),
      recipes: null,
      ingredients: [],
      fridgeOpen: false
      
    }
    
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    }
    )

  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }
  
  _apiCall() {
      var that = this;
        // $.ajax({
        //     url:'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=' + this.state.ingredients.toString(),
        //     type: 'GET', 
        //     data: {}, 
        //     dataType: 'json',
        //     success: function(data) { 
        //         that.setState({
        //             recipes: data     
        //         });
        //         },
        //     error: function(err) { console.log(err); },
        //     beforeSend: function(xhr) {
        //     xhr.setRequestHeader("X-Mashape-Authorization", "OGgxA05LFxmshPOYbcVhff7XvFnsp1cqkWRjsnkY4Ce71CwFAs"); // Enter here your Mashape key
        //     }
        // });
    }
    
  _apiCallAutoComplete(e) {
            var testInput = e.target.value;
            console.log(testInput);
    //     $.ajax({
    //         url:'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?query=' + this.refs.userInput.value,
    //         type: 'GET', 
    //         data: {}, 
    //         dataType: 'json',
    //         success: function(data) { console.log((data)); },
    //         error: function(err) { alert(err); },
    //         beforeSend: function(xhr) {
    //         xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG");
    //             }    
    //         });
        
    }
    
  componentDidMount() {
        this._apiCall();
        console.log(this._apiCall());
        // this._apiCallAutoComplete();
        // console.log( this._apiCallAutoComplete());
        
    }
    
  _handleButtonClick (event) {
      event.preventDefault();
      var userIngredientInput = this.refs.userInput.value;
      var ingredient = this.state.ingredients.concat(userIngredientInput);
      this.setState({
          ingredients: ingredient
      });
     
  }
   
  componentDidUpdate(prevProps, prevState){
        if(prevProps.ingredients != this.state.ingredients){
            this._apiCall();
        }

        // if(prevProps.refs.userInput.value != this.state.userInput.value){
        //     this._apiCallAutoComplete();
        // }
    }
   
  deleteIngredient(i, event) {
        console.log(i);
      event.preventDefault();

      
      this.setState(state => {
          state.ingredients.splice(i, 1);
          return {
              ingredients: this.state.ingredients
          };
      });
  }
   
  _handleFridge(){
    this.setState({
      fridgeOpen: !this.state.fridgeOpen
    })
  }
  


  render(){
    const { profile } = this.state
    return (
      <div className={styles.root} id="home-wrapper">
        <Jumbotron id="sidebar-nav" className="col-large-3">
          <div id="foodme-logo">
            <h2>FoodMe.</h2>
          </div>
          <div id="user-info">
            <img id="user-image" src={profile.picture} />
            <p>Welcome {profile.nickname}!</p>
            <Button id="logout-button" onClick={this.logout.bind(this)}>Logout</Button>
          </div>
          <div className="dividing-line" />
          <div id="nav-buttons">
            <button id="top">Featured</button>
            <button>Quick Search</button>
            <button onClick={this._handleFridge.bind(this)}>Open Your Fridge</button>
            <button>Saved Recipes</button>
          </div>
          <div className="dividing-line" />
         
          <footer>
            <a></a>
            <a></a>
            <a></a>
          </footer>
        </Jumbotron>
        <div id="recipe-and-fridge" className="col-large-9">
          <Collapsible trigger="Fridge +" triggerWhenOpen="Fridge -">
                <section className={styles.root} id="fridge">
                  <div id="submit-wrapper">       
                      <input id="input-ingredient" onChange={this._apiCallAutoComplete.bind(this)} type="text" ref="userInput"></input>
                      <button id="add-ingredient" onClick={this._handleButtonClick.bind(this)}> -> </button>
                  </div>
                  <div id="ingredient-wrapper">
                      {this.state.ingredients.map((ingredient, i) => 
                      <li key={i}>
                          <Ingredient ClassName="ingredient-list" ingredient={ingredient}  onClick={(evt) => this.deleteIngredient(i, evt)}/>
                      </li>
                      )}
                  </div>
                </section>
            </Collapsible>
            <section id="recipe-container" className="overlay">
              <h2 id="recipe-header">Recipes:</h2>
              <RecipeOutput />
            </section>
          </div>
      </div>
    )
  }
}

export default Home;


