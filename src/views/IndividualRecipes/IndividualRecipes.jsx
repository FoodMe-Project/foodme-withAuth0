const React = require('react');
const axios = require('axios');
import styles from './IndividualRecipes.css';
import { Modal, Button } from 'react-bootstrap';
import ModalContent from '../ModalContent/ModalContent';

const IndividualRecipes = React.createClass({  
    getInitialState: function() {
        return {
            showModal: false
        }
    },
    saveUserRecipe: function() {
        this.props.saveUserRecipe(this.props.recipes.id);
    },
    open() {
        this.setState({ showModal: true });
    },
    close() {
        this.setState({ showModal: false });
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
                    <button className="button" onClick={this.open}>SHOW RECIPE</button>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <ModalContent recipeId={this.props.recipes.id} title={this.props.recipes.title} image={this.props.recipes.image}
                    servings/>
                    <Modal.Footer>
                        <Button className="button" onClick={this.close}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>   
            </div>
        )
    }
})

module.exports = IndividualRecipes;