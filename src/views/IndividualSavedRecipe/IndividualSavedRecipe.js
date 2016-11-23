const React = require('react');
const $ = require('jquery');
const axios = require('axios');
import styles from './../IndividualRecipes/IndividualRecipes.css';
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
   _getRecipes: function() {
		const self = this;
		$.ajax({
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information/`,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
			   self.setState({
			       recipeInfo: data,
			   });
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "l1LBB0jz0wmshpT2AzWw4K1uUb6ep1oXuBdjsnQWcgGs9Iutw8");
			}
		});
   	},

   	deleteSavedRecipe: function() {
      this.props.deleteSavedRecipe(this.props.recipeId);
   	},

	render: function() {
   
		return (
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button" 
                onClick={(event) => { this.deleteSavedRecipe(); this.props.onClickArray;}}>
              
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