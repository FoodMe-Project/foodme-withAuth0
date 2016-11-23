import './RecipeObject.css';
import {Button, Thumbnail, Col, Modal} from 'react-bootstrap';
import './../IngredientHomepage/IngredientHomepage.css';
import ModalContent from './../ModalContent/ModalContent';

var React = require('react');
var $ = require('jquery');

var RecipeObject = React.createClass({
    propTypes: {
        recipeObject: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            recipesInfo: null,
            recipesOtherIngredients: null,
            recipesServings: null,
            recipesUrl: null,
            recipesInstructions: null,
            showModal: false
        };
    },
    open() {
        this.setState({ showModal: true });
    },
    close() {
        this.setState({ showModal: false });
    },
    render: function() {
        return (
            <Col xs={6} md={4}>
                <Thumbnail className="eachRecipe" src={this.props.recipeObject.image} alt="242x200">
                    <h3 className="recipeHeaders">{this.props.recipeObject.title.toUpperCase()}</h3>
                    <Button bsStyle="primary" bsSize="large" className="button" onClick={this.open}>SHOW RECIPE</Button>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <ModalContent recipeId={this.props.recipeObject.id} title={this.props.recipeObject.title} image={this.props.recipeObject.image}
                        servings/>
                        <Modal.Footer>
                            <Button className="button" onClick={this.close}>CLOSE</Button>
                        </Modal.Footer>
                    </Modal>
                </Thumbnail>
            </Col>
        );
    }
});

module.exports = RecipeObject;