import React, { PropTypes, Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import styles from './Home.css'
import grid from '../grid.css'
import RecipeOutput from './../Recipes/Recipes'
import Fridge from './../Fridge/Fridge'


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
      fridgeId: null,
      testState: null
      
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
        $.ajax({
            url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=` + this.state.ingredients.toString() + "&number=12",
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
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
      this._apiCall();
      this.testAjax();
    
    }
    
  _handleButtonClick (userIngredientInput) {
       var ingredient = this.state.ingredients.concat(userIngredientInput);
       this.setState({
           ingredients: ingredient
       } );
     
   }
   
  componentDidUpdate(prevProps, prevState){
        console.log(this.state);
        if(prevState.ingredients.length !== this.state.ingredients.length){
            this._apiCall();
        }
    }
   
  deleteIngredient(i) {
       event.preventDefault();

       this.setState(state => {
           state.ingredients.splice(i, 1);
           return {
               ingredients: this.state.ingredients
           };
       });
   }

   testAjax() {
          var that = this;
      // $.ajax({
      //   url: 'localhost:4000/get-fridge/1',
      //   type: 'POST',
      //   data: {},
      //   dataType: 'json',

      //   success: function(data) {
      //     // that.setState({
      //     //   testState: data.fridgeId
      //     console.log('jello', data)
      //     // })
      //   },
      //   error: function (request, status, error) {
      //   alert(request.responseText);
      // }
      // })
      $.post('http://localhost:4000/get-fridge/1', function (data) {
        that.setState({
          testState: data.fridgeId,
        })
        console.log(data)
          
      })
   }

  render(){
    const { profile } = this.state;
    console.log(this.state);
    return (
      <div className={styles.root} className={grid.root} id="home-wrapper">
        <Jumbotron id="sidebar-nav" className="col-large-3">
          <div id="foodme-logo">
            <h2>FoodMe.</h2>
          </div>
          <div id="user-info">
            <img id="user-image" src={profile.picture} alt="user's profile"/>
            <p>Welcome {profile.nickname}!</p>
            <Button id="logout-button" onClick={this.logout.bind(this)}>Logout</Button>
          </div>
          <div className="dividing-line" />
          <div id="nav-buttons">
            <button id="top">Featured</button>
            <button>Search For Recipes</button>
            <button>Saved Recipes</button>
            <button>User Settings</button>
          </div>
          <div className="dividing-line" />
          <footer id="footer-content">
            <a>Contact</a>
            <a>FAQ</a>
            <p>FoodMe. 2016</p>
          </footer>
        </Jumbotron>
        <div id="recipe-and-fridge" className="col-large-9">
              <Fridge
                ingredientsArray={this.state.ingredients} 
                apiCall={this._apiCall.bind(this)}
                componentDidMount={this.componentDidMount.bind(this)}
                handleButtonClick={this._handleButtonClick.bind(this)}
                componentDidUpdate={this.componentDidUpdate}
                deleteIngredient={this.deleteIngredient.bind(this)}
              /> 
              <section id="recipe-container" >
                <RecipeOutput 
                recipes={this.state.recipes}
                recipesId={this.state.recipesId}
                />
              </section>
          </div>
      </div>
    );
  }
}

export default Home;

