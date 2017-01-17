import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';
import RecipeInfo from './../RecipeInfo/RecipeInfo';
import './ModalContent.css';

export default class ModalContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipesInstructions: null,
      recipesOtherIngredients: null,
      recipesServings: null,
      recipesUrl: null
    };
  }

  componentDidMount() {
    this._getRecipesInfo();
  }

  _getRecipesInfo() {
    axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_MASHAPE_KEY;
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information`)
    .then(result => {
      this.setState({
        recipesInstructions: result.data.instructions,
        recipesOtherIngredients: result.data.extendedIngredients,
        recipesServings: result.data.servings,
        recipesUrl: result.data.sourceUrl
      });
    })
    .catch(err => {
      console.log(err.stack);
    })
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title className="recipeName">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="divImage">
          <img src={this.props.image} className="image" alt="recipe"/>
        </div>
          <h3 className="recipeHeaders">Ingredients needed:</h3>
          <div>{this.state.recipesOtherIngredients ?  
              this.state.recipesOtherIngredients.map(recipeOtherIngredients => 
              <RecipeInfo recipeObject={recipeOtherIngredients} key={recipeOtherIngredients.id}/>) :
              ""}</div>
          <h3 className="recipeHeaders">Gives: {this.state.recipesServings} serving(s)</h3>
          {this.state.recipesInstructions === "" || null ? 
            <h5 className="recipeHeaders">No need for instructions for this one!</h5> : 
            <h5 className="recipeHeaders">Instructions:</h5> }
            <p dangerouslySetInnerHTML={{__html: this.state.recipesInstructions}}/>
          <Button bsStyle="primary" className="websiteButton" href={this.state.recipesUrl}>WEBSITE</Button>
        </Modal.Body>
      </div>
    );
  }
}

ModalContent.propTypes = {
  recipeId: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string
};

// var ModalContent = React.createClass({
//     getInitialState() {
//         return {
//         recipesInfo: null, 
//         recipesInstructions: null,
//         recipesOtherIngredients: null,
//         recipesServings: null,
//         recipesUrl: null
//         };
//     },
//     componentDidMount: function() {
//         this._getRecipesInfo();
//     },
//     _getRecipesInfo: function() {
//         var self = this;
//         $.ajax({
//             url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information`,
//             type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
//             data: {}, // Additional parameters here
//             dataType: 'json',
//             success: function(data) {
//                 self.setState({
//                     recipesInfo: data, 
//                     recipesInstructions: data.instructions,
//                     recipesOtherIngredients: data.extendedIngredients,
//                     recipesServings: data.servings,
//                     recipesUrl: data.sourceUrl
//                 });
//             },
//             beforeSend: function(xhr) {
//             xhr.setRequestHeader("X-Mashape-Authorization", "l1LBB0jz0wmshpT2AzWw4K1uUb6ep1oXuBdjsnQWcgGs9Iutw8"); // Enter here your Mashape key
//             }
//         });
//     },
//     render: function() {
//         return (
//             <div>
//                 <Modal.Header closeButton>
//                     <Modal.Title className="recipeName">{this.props.title}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <div className="divImage">
//                     <img src={this.props.image} className="image" alt="recipe"/>
//                 </div>
//                     <h3 className="recipeHeaders">Ingredients needed:</h3>
//                     <p>{this.state.recipesOtherIngredients ?  
//                         this.state.recipesOtherIngredients.map(recipeOtherIngredients => 
//                         <RecipeInfo recipeObject={recipeOtherIngredients} key={recipeOtherIngredients.id}/>) :
//                         ""}</p>
//                     <p>
//                     <h3 className="recipeHeaders">Gives: {this.state.recipesServings} serving(s)</h3>
//                     {this.state.recipesInstructions === "" || null ? 
//                         <h5 className="recipeHeaders">No need for instructions for this one!</h5> : 
//                         <h5 className="recipeHeaders">Instructions:</h5> }
//                         <p dangerouslySetInnerHTML={{__html: this.state.recipesInstructions}}/>
//                     </p>
//                     <Button bsStyle="primary" className="websiteButton" href={this.state.recipesUrl}>WEBSITE</Button>
//                 </Modal.Body>
//             </div>
//         );
//     }
// });

// module.exports = ModalContent;