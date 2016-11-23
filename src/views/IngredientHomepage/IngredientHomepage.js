var React = require('react');

var Ingredient = React.createClass({
    render: function() {
        return (
            <div>
                <form className="add-ingredient-input">    
                    <text>{this.props.ingredient}</text>
                    <button className="xButton" onClick={this.props.onClick}>x</button>
                </form>
            </div>
        );
    }
});

module.exports =  Ingredient;