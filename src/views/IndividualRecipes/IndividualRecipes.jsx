var React = require('react');
import styles from './IndividualRecipes.css';
var axios = require('axios');

var IndividualRecipes = React.createClass({  

    saveUserRecipe: function() {
        axios.post(`http://localhost:4000/insert-save-recipe`, {
          clientId: this.props.clientId,
          recipeId: this.props.recipes.id
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err.stack);
        })
   },

    render: function() {
    
        return (
        
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button" onClick={this.saveUserRecipe}><i id="favourite-button" className="material-icons 24md">stars</i></button>
                <img src={this.props.recipes.image} alt="recipe representation"/>
            </div>
            <div className="seperating-line">
            </div>
            <h2>{this.props.recipes.title}</h2>
         
            <div id="read-more-wrapper">
                <button id="read-more">See Recipe</button>
            </div>    
        </div>
        )
    }
})

module.exports = IndividualRecipes;