var React = require('react');
import styles from './Recipes.css';
import IndividualRecipes from "./../IndividualRecipes/IndividualRecipes";

var recipesArray = [
    {
        image: "http://lorempixel.com/400/300/food/1",
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/2" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/3" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/4" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/5" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/6" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/7" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/8" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/9" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/1",
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/2" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/3" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/4" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/5" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/6" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/7" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/8" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    },
    {
        image: "http://lorempixel.com/400/300/food/9" ,
        title: "This Recipe",
        info: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula"
    }
    ];
var RecipeOutput = React.createClass({
    propTypes: {
        
    },
    
    render: function() {
       return (

            <ul>
                {recipesArray.map((recipes, i) => 
                <li key={i} className="recipe-list">
                    <IndividualRecipes className="recipes-list" recipes={recipes} />
                </li>
                )}
            </ul>

        );
    }
});

module.exports = RecipeOutput;