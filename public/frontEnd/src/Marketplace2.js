var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');
var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var CardMedia = require('material-ui/lib/card/card-media');
var CardTitle = require('material-ui/lib/card/card-title');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var CardActions = require('material-ui/lib/card/card-actions');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');

var LeftNav = require('material-ui/lib/left-nav');



var Card2 = require('./Card2');
var BugFilter2 = require('./BugFilter2');
var BugAdd = require('./BugAdd');

var CardListContainer = require('./CardListContainer');

var BugRow = React.createClass({
  getStyle: function(width, bug) {
    var style = {height: 24};
    if (width) style.width = width;
    if (bug.priority == 'P1') style.color = 'red';
    return style;
  },
  render: function() {
    //console.log("Rendering BugRow:", this.props.bug);
    var bug = this.props.bug;
    return (
      <TableRow>
        <TableRowColumn style={this.getStyle(180, bug)}>
          <Link to={'/bugs/' + bug._id}>{bug._id}</Link>
        </TableRowColumn>
        <TableRowColumn style={this.getStyle(40, bug)}>{bug.status}</TableRowColumn>
        <TableRowColumn style={this.getStyle(40, bug)}>{bug.priority}</TableRowColumn>
        <TableRowColumn style={this.getStyle(60, bug)}>{bug.owner}</TableRowColumn>
        <TableRowColumn style={this.getStyle(undefined, bug)}>{bug.title}</TableRowColumn>
      </TableRow>
    )
  }
});


var Marketplace2 = React.createClass({
  getInitialState: function() {
    return {cards: []};
  },
  handleToggle: function() {
      console.log("OPEN!");
      this.setState({open: !this.state.open});
  },
  render: function() {
    return (
    <div>
    <div >
    <LeftNav width= {140}>
      <MenuItem linkButton={true} href="/#/home"
        style={{verticalAlign: 'top'}} >Home</MenuItem>
      <MenuItem linkButton={true} href="/#/currentBets"
        style={{verticalAlign: 'top'}}>My Bets</MenuItem>
    </LeftNav>
  </div>
    <div id = "indent">
    <p> The Marketplace</p>
    <CardListContainer />
    </div>
    </div>
    )
  }
});

module.exports = Marketplace2;
