var React = require('react');
var ReactDOM = require('react-dom');
var CardListContainer = require('./CardListContainer');

var Marketplace = React.createClass({
  render: function() {
    //console.log("Rendering BugAdd");
    return (
      <div>
      <h1> Chancellor </h1>

      <CardListContainer />

      </div>
    );
  }
});
module.exports = Marketplace;
