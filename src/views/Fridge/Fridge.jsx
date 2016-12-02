var React = require('react');
import './../Home/Home.css';
import './../grid.css'

import Ingredient from './../Ingredient/Ingredients';


var Fridge = React.createClass({
    
    handleButtonClick: function(event) {
        event.preventDefault(); 
        var userIngredientInput = this.refs.userInput.value;
        this.props.handleButtonClick(userIngredientInput);
    },
    
    deleteIngredient: function(i, event, ingredient) {
        event.preventDefault();
        this.props.deleteIngredient(i, ingredient);
    },

    copyIngredient: function(i, event) {
      event.preventDefault();
      this.props.copyIngredient(i);

    },
    
    render: function() {
        var ingredientsArray = this.props.ingredientsArray;

        return (

              <div id="fridge-and-search">
                <section id="fridge" >
                  <form id="submit-wrapper">       
                      <input id="input-ingredient" type="text" ref="userInput" ></input>
                      <button id="add-ingredient" onClick={this.handleButtonClick}>-></button>
                  </form>
                  <div id="ingredient-wrapper">
                      {ingredientsArray.map((ingredient, i) => 
                      <li key={i}>
                          <Ingredient ClassName="ingredient-list" 
                          ingredient={ingredient}  
                          onClickCopy={(evt) => this.copyIngredient(i, evt)}
                          onClickDelete={(evt) => this.deleteIngredient(i, evt, ingredient)}/>
                      </li>
                      )}
                  </div>
                </section>
              </div>
            

        );
    }
});

module.exports = Fridge;