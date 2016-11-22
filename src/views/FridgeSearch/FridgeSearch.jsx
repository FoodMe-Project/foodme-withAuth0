var React = require('react');
import styles from "./FridgeSearch.css";
import Ingredient from "./../Ingredient/Ingredients";
import grid from './../grid.css'


var FridgeSearch = React.createClass({
    propTypes: {
        
    },
    
    render: function() {
       return (
            <form id="quick-search-fridge-wrapper">
                <ul id="search-recipe-list">
                    <li>
                    hey
                    </li>
                    <button id="fridge-search-button">Search Recipes</button>
                </ul>
                
            </form>
        );
    }
});

module.exports = FridgeSearch;



