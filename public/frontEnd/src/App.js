var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var $ = require('jquery');
var Link = require('react-router').Link;

var Marketplace2 = require('./Marketplace2');
var BugEdit = require('./BugEdit');
var CurrentBets = require('./CurrentBets');
var Home = require('./Home');

var AppBar = require('material-ui/lib/app-bar');
var MenuItem = require('material-ui/lib/menus/menu-item');
var LeftNav = require('material-ui/lib/left-nav');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

var menuItems = [
  { route: '/', text: 'Home' },
  { route: 'currentBets', text: 'Current Bets' },
];

ReactDOM.render(
  (
    <Router>
    <Route path="/home" component={Home} />
    <Route path="/marketplace" component={Marketplace2} />
    <Route path="/currentBets" component={CurrentBets} />
    <Redirect from="/" to="/home" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);
