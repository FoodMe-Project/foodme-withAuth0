import React, {Component, PropTypes} from 'react';
import './Recipe.css';
import {Button, Thumbnail, Col, Modal} from 'react-bootstrap';
import ModalContent from './../ModalContent/ModalContent';

export default class Recipe extends Component {
  
  constructor(props) {
    super(props);
    this._savedButtonClick = this._savedButtonClick.bind(this);
    this._deleteRecipe = this._deleteRecipe.bind(this);
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this.state = {
      showModal: false,
      savedButton: false
    }
  }

  _savedButtonClick() {
    if (!this.state.savedButton) {
      this.props.saveUserRecipe(this.props.recipe.id);
      this.setState({
          savedButton: true
      })
    }
    else {
      this.props.deleteSavedRecipe(this.props.recipe.id);
      this.setState({
          savedButton: false
      })
    }
  }

  _deleteRecipe() {
    this.props.deleteSavedRecipe(this.props.recipe.id);
    this.props.displaySavedRecipe();
  }

  _open() {
    this.setState({ showModal: true });
  }

  _close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Col xs={6} md={4}>
        <Thumbnail className="eachRecipe" src={this.props.recipe.image} alt="242x200">
          <h3 className="recipeHeaders">{this.props.recipe.title.toUpperCase()}</h3>
          {this.props.saveUserRecipe && this.props.deleteSavedRecipe ?
            this.state.savedButton ?
              <Button bsStyle="primary" bsSize="large" className="button" onClick={this._savedButtonClick}>UNSAVE RECIPE</Button>
              : <Button bsStyle="primary" bsSize="large" className="button" onClick={this._savedButtonClick}>SAVE RECIPE</Button>
            : null
          }
          {!this.props.saveUserRecipe && this.props.deleteSavedRecipe ?
            <Button bsStyle="primary" bsSize="large" className="button" onClick={this._deleteRecipe}>UNSAVE RECIPE</Button>
            : null
          }
          <Button bsStyle="primary" bsSize="large" className="button" onClick={this._open}>SHOW RECIPE</Button>
          <Modal show={this.state.showModal} onHide={this._close}>
            <ModalContent recipeId={this.props.recipe.id} title={this.props.recipe.title} image={this.props.recipe.image}
            servings/>
            <Modal.Footer>
              <Button className="button" onClick={this._close}>CLOSE</Button>
            </Modal.Footer>
          </Modal>
        </Thumbnail>
      </Col>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object
};