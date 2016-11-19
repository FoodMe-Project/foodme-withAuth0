var React = require('react');
import styles from './IndividualRecipes.css';

var IndividualRecipes = React.createClass({
    
    render: function() {
        return (
        
        <div id="individual-recipe-wrapper">
            <img src={this.props.recipes.image} />
            <div className="seperating-line">
                <hr />
            </div>
           
            <h2>{this.props.recipes.title}</h2>
            <hr />
            <div id="recipe-info">{this.props.recipes.info}</div>
            
        </div>
        )
    }
})

module.exports = IndividualRecipes;