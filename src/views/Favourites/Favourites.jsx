var React = require('react');
import styles from "./Favourites";
import Ingredient from "./../Ingredient/Ingredients";
import grid from './../grid.css'

var recipesArray2 = [
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
    
var Favourites = React.createClass({
    propTypes: {
        
    },
    
    //Here we will grab the recipe ID #'s from the database and then call the API with the id's to map them out to this page
    
    render: function() {
       return (
            <ul>
                {recipesArray2.map((recipes, i) => 
                <li key={i} className="favourites-list">
                    <IndividualRecipes className="favourites-list" recipes={recipes} />
                </li>
                )}
            </ul>
        );
    }
});

module.exports = Favourites;



