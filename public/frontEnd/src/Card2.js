var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');

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
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');

var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var StarBorder = require('material-ui/lib/svg-icons/toggle/star-border');
var IconButton = require('material-ui/lib/icon-button');

var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');
var Avatar = require('material-ui/lib/avatar');


var CardActions = require('material-ui/lib/card/card-actions');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');


var anyValue = '*';
var Card2 = React.createClass({
  render: function() {
    // console.log("Rendering bug table, num items:", this.props.bugs.length);
    console.log("Rendering Card");

    if (this.props.isCurrent) {
      var buttons = (
        <CardActions expandable={false}>
          <FlatButton label="CANCEL" onClick = {this.handleRemoveCurrent}/>
        </CardActions>
      );
    } else {
      var buttons = (
        <CardActions expandable={false}>
          <FlatButton label="Team One" onClick = {this.takeBet(this.props.teamOne)}/>
          <FlatButton label="Team Two" onClick = {this.takeBet(this.props.teamTwo)}/>
        </CardActions>
      );
    }

    return (
      <Card>
        <CardHeader
          title={this.props.vendor}
          subtitle={this.props.odds} off
          subtitle={this.props.product}
          actAsExpander={false}
          showExpandableButton={false}
          avatar={this.props.vendorPhoto}
        />
        <List>
          <ListItem primaryText={this.props.teamOne}
          rightAvatar={<Avatar src={this.props.photoOneURL} />} />
        </List>
        <List>
          <ListItem primaryText={this.props.teamTwo}
          rightAvatar={<Avatar src={this.props.photoTwoURL} />} />
        </List>
        <CardText>
          This deal ends tomorrow!
        </CardText>
        {buttons}
      </Card>
    )
  },

  takeBet: function(chosenTeam) {
      console.log("AvailableBet Clicked");
      console.log("Chosen Team ", chosenTeam);
      this.props.handleDelete(this.props.id, chosenTeam);
  },

  handleRemoveCurrent: function() {
      console.log("CurrentBet Removed");
      this.props.handleRemove(this.props.id, this.props.isCurrent);
  },



});


module.exports = Card2;
