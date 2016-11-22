var React = require('react');
import styles from './Recipes.css';
import IndividualRecipes from "./../IndividualRecipes/IndividualRecipes";


var RecipeOutput = React.createClass({
    
    render: function() {
        var recipesArray= this.props.recipes;

       return (

            <ul className="overlay">
                {recipesArray.map((recipes, i) => 
                <li key={i} className="recipe-list">
                    <IndividualRecipes className="recipes-list" recipes={recipes} clientId={this.props.clientId}/>
                </li>
                )}
            </ul>

        );
    }
});

module.exports = RecipeOutput;