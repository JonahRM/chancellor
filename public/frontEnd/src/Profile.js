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

var CardListContainer = require('./CardListContainer');


var Profile = React.createClass({
  getInitialState: function() {
    return {profile:[]}
  },
  componentDidMount: function() {
    $.ajax('/api/profileJSON').done(function(data) {
      this.setState({profile: data});
    }.bind(this));
  },
  render: function() {

    if(this.state.profile.user === undefined) {
      return <div> Logging in ...</div>
    }
    else {
    var emailString = "Current Email: "+ this.state.profile.user.facebook.email;

    return (
    <div>
    <p> My Chancellor Profile</p>
     <Card>
        <CardHeader
          title={this.state.profile.user.facebook.name}
          avatar={this.state.profile.user.facebook.profilePictureURL}
        />
        <CardText>
        {emailString}
        </CardText>
        <CardText>
        Number of Current Deals: {this.state.profile.user.currentBets.length}
        </CardText>
        <CardText>
          Thank you for choosing Chancellor!
        </CardText>
      </Card>
    </div>
  );
  }

  }
});

module.exports = Profile;
