var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var injectTapEventPlugin = require('react-tap-event-plugin');

var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;

var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');

var CardActions = require('material-ui/lib/card/card-actions');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');

var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var StarBorder = require('material-ui/lib/svg-icons/toggle/star-border');
var IconButton = require('material-ui/lib/icon-button');

// import GridList from 'material-ui/lib/grid-list/grid-list';

var Card2 = require('./Card2');


var CardList = React.createClass({

  render: function() {
    console.log("Rendering CardList");
    var that = this;
    var cards = this.props.data.map(function(card) {
      return <Card2 key={card._id} cardID={card._id} vendor = {card.vendor}
      vendorPhoto = {card.vendorPhoto}
      teamOne = {card.teamOne}
      photoOneURL = {card.photoOneURL}
      teamTwo = {card.teamTwo}
      photoTwoURL = {card.photoTwoURL}
      odds = {card.odds}
      league = {card.league}
      eventTime = {card.eventTime}
      percentage = {card.percentage}
      product = {card.product}
      handleDelete = {that.props.handleDelete}
      handleRemove = {that.props.handleRemove}
      userChosenTeam = {that.props.userChosenTeam}
      isCurrent = {that.props.isCurrent}/>
    });

    return (

      <div>
          <GridList
            cols = {4}
            padding = {30}
            cellHeight={400}>

          {cards}

          </GridList>
        </div>



    );
  }
});


module.exports = CardList;
