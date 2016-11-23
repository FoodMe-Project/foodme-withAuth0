var React = require('react');
import styles from './Ingredients.css';

var QuickSearchIngredient = React.createClass({
    
    render: function() {

        console.log('quicksearching item', this.props.ingredient)

        return (
            <div className={styles.root}>
                <form id="add-ingredient-input">    
                    <text>{this.props.ingredient}</text>
                    <button onClick={this.props.onClick}>x</button>
                </form>
            </div>
        );
    }
});

module.exports =  QuickSearchIngredient;