import React from 'react';
import axios from 'axios';
import './../IndividualRecipes/IndividualRecipes.css';
import ModalContent from '../ModalContent/ModalContent';
import { Modal, Button } from 'react-bootstrap';

const IndividualSavedRecipe = React.createClass({
	getInitialState() {
		return {
			recipeInfo: {},
			showModal: false
		}
	},
	componentDidMount: function() {
		this._getRecipes();
   	},
   	open() {
        this.setState({ showModal: true });
    },
    close() {
        this.setState({ showModal: false });
    },

  _getRecipes() {
    axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_MASHAPE_KEY;
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information/`)
    .then(result => {
      this.setState({
        recipes: result.data
      });
    })
    .catch(err => {
      console.log(err.stack);
    })
  },


   	deleteSavedRecipe: function() {
      this.props.deleteSavedRecipe(this.props.recipeId);
   	},

	render: function() {
   
		return (
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button" 
                onClick={(event) => {this.deleteSavedRecipe()}}>
              
                <i id="favourite-button" className="material-icons 24md">clear</i>
                </button>
                <img src={this.state.recipeInfo.image} alt="recipe representation"/>
            </div>
            <div className="seperating-line">
            </div>
            <h2>{this.state.recipeInfo.title}</h2>
         
            <div id="read-more-wrapper">
                <button className="button" onClick={this.open}>SHOW RECIPE</button>
            </div>
            <Modal show={this.state.showModal} onHide={this.close}>
                    <ModalContent recipeId={this.state.recipeInfo.id} title={this.state.recipeInfo.title} image={this.state.recipeInfo.image}
                    servings/>
                    <Modal.Footer>
                        <Button className="button" onClick={this.close}>CLOSE</Button>
                    </Modal.Footer>
             </Modal>   
        </div>
		)
	}
})

module.exports = IndividualSavedRecipe;