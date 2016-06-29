var React = require('react');

var CountryDisplay = React.createClass({
  

  render: function() {

    return (
      <div>
      <h4>{this.props.country.name}</h4>
      <h4>{this.props.country.population}</h4>
      </div>
    );
  }
});

module.exports = CountryDisplay;