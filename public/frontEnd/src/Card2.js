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
var Styles= require('material-ui/lib/styles');
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

var Popover  = require('material-ui/lib/popover/popover');
var PopoverAnimationFromTop  = require('material-ui/lib/popover/popover-animation-from-top');

var CardActions = require('material-ui/lib/card/card-actions');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');


var anyValue = '*';
var Card2 = React.createClass({

  render: function() {
    // console.log("Rendering bug table, num items:", this.props.bugs.length);
    console.log("Rendering Card");
    var eventTime = this.props.eventTime;

    eventTime = eventTime.split("-");
    var eventDate =  eventTime[1] + "/" + eventTime[2].split(" ")[0];
    var eventHour = eventTime[2].split(" ")[1];
    var subtitleString = this.props.product + " at "+ this.props.percentage + "% off!";
    var chosenTeamStringOne = "Click to choose the " + this.props.teamOne;
    var chosenTeamStringTwo = "Click to choose the " + this.props.teamTwo;
    var oddsTwo = this.props.odds * (-1);
    if (this.props.isCurrent) {
      var buttons = (
        <div>
        <CardText>
          Chosen Team: {this.state.userChosenTeam}
        </CardText>
        <CardActions expandable={false}>
          <FlatButton label="CANCEL" onClick = {this.handleRemoveCurrent}/>
        </CardActions>
        </div>
      );
      var question = (
        <CardText>
        </CardText>
      );
    } else {
      var buttons = (
        <CardActions>
        </CardActions>
      );
      var question = (
        <CardText>
        if the {this.state.userChosenTeam} win by {this.props.odds}, you get {this.props.percentage}% off!
        </CardText>
      );
    }
    var styles = {
          popover: {
                padding: 20,
                  },
          };

    if(this.state.userChosenTeam === this.props.teamOne){
      var displayTeam = (
        <List onClick = {this.takeBet.bind(this, this.props.teamOne)}>
          <ListItem primaryText= {chosenTeamStringOne} secondaryText={this.props.odds}
          className="muidocs-checkbox-example"/>
        </List>
      );
    } else {

      var displayTeam = (
        <List onClick = {this.takeBet.bind(this, this.props.teamTwo)}>
          <ListItem primaryText={chosenTeamStringTwo}
          secondaryText={oddsTwo}/>
        </List>
      );
    }


    return (
      <div>
      <Card>
              <CardHeader
                title={this.props.vendor}
                subtitle={subtitleString}
                subtitleColor= {Colors.redA700}
                actAsExpander={false}
                showExpandableButton={false}
                avatar={this.props.vendorPhoto}

              />
              <List onClick = {this.onClick.bind(this, this.props.teamOne)}>
                <ListItem onClick = {this.handleTouchTap}
                primaryText={this.props.teamOne} secondaryText={this.props.odds}
                className="muidocs-checkbox-example"
                rightAvatar={<Avatar src={this.props.photoOneURL} />} />
              </List>
              <List onClick = {this.onClick.bind(this, this.props.teamTwo)}>
                <ListItem onClick = {this.handleTouchTap}
                primaryText={this.props.teamTwo}
                rightAvatar={<Avatar src={this.props.photoTwoURL} />} />
              </List>
                <CardText>
                Time: {eventHour}   &nbsp;  &nbsp;  &nbsp;        Date: {eventDate}
              </CardText>

              {buttons}
            </Card>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
          targetOrigin={{horizontal: 'middle', vertical: 'center'}}
          animation={PopoverAnimationFromTop}
          onRequestClose={this.handleRequestClose}>
          <div style={styles.popover}>
          <Card>
                  <CardHeader
                    title={this.props.vendor}
                    subtitle={subtitleString}
                    subtitleColor= {Colors.redA700}
                    actAsExpander={false}
                    showExpandableButton={false}
                    avatar={this.props.vendorPhoto}

                  />
                  {displayTeam}
                  {question}
                    <CardText>
                    Time: {eventHour}   &nbsp;  &nbsp;  &nbsp;        Date: {eventDate}
                  </CardText>

                  {buttons}
                </Card>
          </div>
        </Popover>


            </div>
    )
  },
  getInitialState: function() {
    return {open: false};
  },
  takeBet: function(chosenTeam, e) {
      console.log("AvailableBet Clicked");
      console.log("Chosen Team ", this.props.userChosenTeam);
      this.props.handleDelete(this.props.cardID, chosenTeam);
  },

  handleRemoveCurrent: function() {
      console.log("CurrentBet Removed");
      this.props.handleRemove(this.props.cardID, this.props.isCurrent);
  },
  onClick: function(chosenTeam, e) {
    console.log("User Chosen Team:", chosenTeam);
      this.setState({
        userChosenTeam: chosenTeam,
      });
    },
  handleTouchTap: function(event) {
    console.log("touch tapped");
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    },

  handleRequestClose: function() {
      this.setState({
        open: false,
      });
    },

});


module.exports = Card2;
