var React = require('react');
import styles from './../Home/Home.css';
import grid from './../grid.css'
import FridgeSearch from "./../FridgeSearch/FridgeSearch";
import Collapsible from 'react-collapsible';
import Ingredient from './../Ingredient/Ingredients';


var Fridge = React.createClass({
    
    handleButtonClick: function(event) {
        event.preventDefault(); 
        var userIngredientInput = this.refs.userInput.value;
        this.props.handleButtonClick(userIngredientInput);
    },
    
    deleteIngredient: function(i, event) {
        event.preventDefault();
        this.props.deleteIngredient(i);
    },
    
    render: function() {
        var fridgeOpen = <span><i className="material-icons">kitchen</i><i className="material-icons">close</i></span>;
        var fridgeClosed = <span><i className="material-icons">kitchen</i><i className="material-icons">arrow_forward</i></span>;
        
        // var recipes = this.props.recipes;
        // var fridgeId = this.props.fridgeId;
        // var apiCall= this.props._apiCall;
        // var componentDidMount = this.props.componentDidMount;
        var ingredientsArray = this.props.ingredientsArray;
        // var componentDidUpdate = this.props.componentDidUpdate;
      
        // var apiCallAutocomplete = this.apiCallAutocomplete;
        
        return (

            <Collapsible 
                trigger={fridgeClosed} 
                triggerWhenOpen={fridgeOpen}
                open='true'   
                >
              <div id="fridge-and-search" className="col-large-9">
                <section className={styles.root} id="fridge" className="col-large-7">
                  <form id="submit-wrapper">       
                      <input id="input-ingredient" type="text" ref="userInput" ></input>
                      <button id="add-ingredient" onClick={this.handleButtonClick}>-></button>
                  </form>
                  <div id="ingredient-wrapper">
                      {ingredientsArray.map((ingredient, i) => 
                      <li key={i}>
                          <Ingredient ClassName="ingredient-list" ingredient={ingredient}  onClick={(evt) => this.deleteIngredient(i, evt)}/>
                      </li>
                      )}
                  </div>
                </section>
              </div>
            </Collapsible>

        );
    }
});

module.exports = Fridge;