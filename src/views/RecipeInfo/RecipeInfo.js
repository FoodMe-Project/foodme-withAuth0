var React = require('react');

var RecipeInfo = React.createClass({
    propTypes: {
        recipeObject: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div className="hello">
                <ul>
                    <li>{this.props.recipeObject.name} ({this.props.recipeObject.amount} {this.props.recipeObject.unitLong})</li>
                </ul>
            </div>
        );
    }
});

module.exports = RecipeInfo;