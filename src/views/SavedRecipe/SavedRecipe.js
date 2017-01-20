import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import './../Recipe/Recipe.css';
import ModalContent from '../ModalContent/ModalContent';
import {Modal, Button, Thumbnail, Col} from 'react-bootstrap';

export default class SavedRecipe extends Component {

  constructor(props) {
    super(props);
    this._getRecipe = this._getRecipe.bind(this);
    this._deleteSavedRecipe = this._deleteSavedRecipe.bind(this);
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.state = {
      recipe: this._getRecipe(),
      showModal: false
    }
  }

  // getInitialState() {
  //   console.log('recipeId', this.props.recipeId)
  //   console.log('SavedRecipe componentDidMount')
  //   this._getRecipe();
  // }

  _getRecipe() {
    console.log('getRecipe');
    axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_MASHAPE_KEY;
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information/`)
    .then(result => {
      console.log(result);
      this.forceUpdate();
      return result.data
      // this.setState({
      //   recipe: result.data
      // });
    })
    .catch(err => {
      (err.stack);
    })
  }

  _deleteSavedRecipe() {
    this.props.deleteSavedRecipe(this.props.recipeId);
  }

  _open() {
    this.setState({ showModal: true });
  }

  _close() {
    this.setState({ showModal: false });
  }

  render() {
    console.log('savedRecipe', this.state.recipe);
    return (
      <Col xs={6} md={4}>
        <Thumbnail className="eachRecipe" src={this.state.recipe.image} alt="242x200">
          <h3 className="recipeHeaders">{this.state.recipe.title.toUpperCase()}</h3>
          <Button bsStyle="primary" bsSize="large" className="button" onClick={this._deleteSavedRecipe}>UNSAVE RECIPE</Button>
          <Button bsStyle="primary" bsSize="large" className="button" onClick={this._open}>SHOW RECIPE</Button>
          <Modal show={this.state.showModal} onHide={this._close}>
            <ModalContent recipeId={this.state.recipe.id} title={this.state.recipe.title} image={this.props.recipe.image}
            servings/>
            <Modal.Footer>
              <Button className="button" onClick={this._close}>CLOSE</Button>
            </Modal.Footer>
          </Modal>
        </Thumbnail>
      </Col>
    );
  }
};

SavedRecipe.propTypes = {
  recipeId: PropTypes.string,
  deleteSavedRecipe: PropTypes.func
};

// const IndividualSavedRecipe = React.createClass({
// 	getInitialState() {
// 		return {
// 			recipeInfo: {},
// 			showModal: false
// 		}
// 	},
// 	componentDidMount: function() {
// 		this._getRecipes();
//    	},
//    	open() {
//         this.setState({ showModal: true });
//     },
//     close() {
//         this.setState({ showModal: false });
//     },

//   _getRecipes() {
//     axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_MASHAPE_KEY;
//     axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipeId}/information/`)
//     .then(result => {
//       this.setState({
//         recipes: result.data
//       });
//     })
//     .catch(err => {
//       console.log(err.stack);
//     })
//   },


//    	deleteSavedRecipe: function() {
//       this.props.deleteSavedRecipe(this.props.recipeId);
//    	},

// 	render: function() {
   
// 		return (
//         <div id="individual-recipe-wrapper">
//             <div id="button-and-image">
//                 <button id="save-button" 
//                 onClick={(event) => {this.deleteSavedRecipe()}}>
              
//                 <i id="favourite-button" className="material-icons 24md">clear</i>
//                 </button>
//                 <img src={this.state.recipeInfo.image} alt="recipe representation"/>
//             </div>
//             <div className="seperating-line">
//             </div>
//             <h2>{this.state.recipeInfo.title}</h2>
         
//             <div id="read-more-wrapper">
//                 <button className="button" onClick={this.open}>SHOW RECIPE</button>
//             </div>
//             <Modal show={this.state.showModal} onHide={this.close}>
//                     <ModalContent recipeId={this.state.recipeInfo.id} title={this.state.recipeInfo.title} image={this.state.recipeInfo.image}
//                     servings/>
//                     <Modal.Footer>
//                         <Button className="button" onClick={this.close}>CLOSE</Button>
//                     </Modal.Footer>
//              </Modal>   
//         </div>
// 		)
// 	}
// })

// module.exports = IndividualSavedRecipe;