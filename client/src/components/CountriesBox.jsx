var React = require('react');
var CountriesSelector = require ('./CountriesSelector.jsx')
var CountryDisplay =require('./CountryDisplay.jsx')

var CountriesBox = React.createClass({
  getInitialState: function() {
    return {
      countries: [], displayCountry: null, borderingCountries: []
    };
  },

  setDisplayCountry: function(country){
    this.setState({ displayCountry: country });
  },

  borderCountries: function() {
    var something = this.state.displayCountry.borders.map(function(country){
      for (var c of this.state.countries){
        if (c.alpha3Code === country){
          return c
        }
      }
    });
    this.setState({ borderingCountries: something} );
  },

  componentDidMount: function() {
    console.log('CDM was called');
    var url = "http://restcountries.eu/rest/v1/all";
    var request =  new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      var data = JSON.parse(request.responseText);
      this.setState({countries: data });
    }.bind(this)
    request.send();
  },

  render: function() {
    var displayElement = <h4> No Country Selected </h4>
    if(this.state.displayCountry){
      displayElement = 
        <CountryDisplay 
        country={this.state.displayCountry} 
        countries={this.state.borderingCountries}
        />
    }
    return  (
      <div>
        <h4> Countries Box </h4>
        <CountriesSelector 
        countries={this.state.countries}
        onSelectCountry={this.setDisplayCountry}
        borderCountries={this.borderCountries}
        />
        {displayElement}
      </div>
    )
  }
});

module.exports = CountriesBox;