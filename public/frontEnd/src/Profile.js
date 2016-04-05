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
    console.log("Yo", this.state);

    if(this.state.profile.user === undefined) {
      return <div> Logging in ...</div>
      console.log("Yo", this.state.profile.user);
        console.log("Yo", this.state.profile.user.facebook.name);
    }
    else {

    return (
    <div>
    <p> My Profile Yo</p>
     <Card>
        <CardHeader
          title={this.state.profile.user.facebook.name}

        />
        <Avatar src={this.state.profile.user.facebook.profilePictureURL} />
        <CardText>
          This ends tomorrow!
        </CardText>
      </Card>
    </div>
  );
  }

  }
});

module.exports = Profile;