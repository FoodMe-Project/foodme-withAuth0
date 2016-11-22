var React = require('react');
import styles from './IngredientHomepage.css';

var Ingredient = React.createClass({
    render: function() {
        return (
            <div>
                <form className="add-ingredient-input">    
                    <text>{this.props.ingredient}</text>
                    <button onClick={this.props.onClick}>x</button>
                </form>
            </div>
        );
    }
});

module.exports =  Ingredient;