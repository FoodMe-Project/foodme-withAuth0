var React = require('react');
import styles from './IndividualRecipes.css';

var IndividualRecipes = React.createClass({
    
    render: function() {
        return (
        
        <div id="individual-recipe-wrapper">
            <div id="button-and-image">
                <button id="save-button"><i id="favourite-button" className="material-icons 24md">stars</i></button>
                <img src={this.props.recipes.image} />
            </div>
            <div className="seperating-line">
            </div>
            <h2>{this.props.recipes.title}</h2>
         
            <div id="read-more-wrapper">
                <button id="read-more">See Recipe</button>
            </div>    
        </div>
        )
    }
})

module.exports = IndividualRecipes;