import React from 'react';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';
import Link from 'material-ui/svg-icons/content/link';
import Email from 'material-ui/svg-icons/communication/email';
import Star from 'material-ui/svg-icons/toggle/star';
import DeviceHub from 'material-ui/svg-icons/hardware/device-hub';

import {yellow500, blue300, red500} from 'material-ui/styles/colors';

const styles = {
}

export default class Content extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ownerDetailsObj: {},
      ownerReposArray: [],
    };

  }

  componentWillMount(){
    // Request to fetch owner details
    $.ajax({
      type: "GET",
      url: "https://api.github.com/users/" + this.props.selectedOwnerObj.owner.login,
      success: function(ownerSearchResult){
        // Request to fetch the repos of matching owner
        $.ajax({
          type: "GET",
          url: this.props.selectedOwnerObj.owner.repos_url,
          success: function(ownerReposResult){
            var repos = [];
            // Checking if any unexpected result of ownerReposResult is received in response
            if(ownerReposResult.constructor === Array){
              repos = ownerReposResult;
            }
            this.setState({
              ownerDetailsObj: ownerSearchResult,
              ownerReposArray: repos,
            });
          }.bind(this),
          error: function(err) {
            console.log("Error while fetching repos of ", this.props.selectedOwnerObj.name, " :: ", err);
          }.bind(this)
        });
      }.bind(this),
      error: function(err) {
        console.log("Error while fetching details of ", this.props.selectedOwnerObj.name, " :: ", err);
      }.bind(this)
    });
  }

  render(){
    var ownerRepos = [];
    console.log("Owner repos:: ", this.state.ownerReposArray);
    if(this.state.ownerReposArray.length > 0){
      console.log("Inside IF");
      this.state.ownerReposArray.forEach(function (ownerRepoObj, i) {
        console.log("Inside Loop :: "), i, ownerRepoObj;
        ownerRepos.push(
          <div key={i}>
            <h3 style={{fontWeight: 600, color: '#005fcd'}}>{ownerRepoObj.name}</h3>
            <p style={{color: '#686f6e', fontSize: 15}}>{ownerRepoObj.description}</p>
            <br />
            <div style={{display: 'flex'}}>
              <div style={{marginRight: 40, flex: '10%'}}>
                {ownerRepoObj.language}
              </div>
              <div style={{marginRight: 40, flex: '10%'}}>
                <Star style={{marginRight: 10, marginBottom: -7}} />
                {ownerRepoObj.stargazers_count}
              </div>
              <div style={{marginRight: 40, flex: '10%'}}>
                <DeviceHub style={{marginRight: 10, marginBottom: -7}} />
                {ownerRepoObj.forks}
              </div>
              <div style={{marginRight: 40, flex: '0 0 10%'}}>
                Updated on {(new Date(ownerRepoObj.updated_at)).toString().split(' ').slice(1, 4).join(' ')}
              </div>
            </div>
            <hr />
          </div>
        );
      }.bind(this));
    }
    return (
      <div style={{padding: "0px 50px"}}>
        <div style={{display: 'flex'}}>
          <div style={{flex: '5%', paddingRight: 15, borderRight: '1px solid #ccc'}}>
            <img style={{height: 250}} src={this.state.ownerDetailsObj.avatar_url} alt={this.state.ownerDetailsObj.name} />
            <h3>{this.state.ownerDetailsObj.name}</h3>
            <p style={{fontStyle: 'italic'}}>{this.state.ownerDetailsObj.login}</p>
            <hr />
            {(this.state.ownerDetailsObj.location != null && this.state.ownerDetailsObj.location != "") ?
              <div style={{marginBottom: 10}}>
                <PinDrop style={{marginRight: 15, marginBottom: -7}} color={red500} />
                <span>{this.state.ownerDetailsObj.location}</span>
              </div>
              :
              null
            }
            {(this.state.ownerDetailsObj.email != null && this.state.ownerDetailsObj.email != "") ?
              <div style={{marginBottom: 10}}>
                <Email style={{marginRight: 15, marginBottom: -7}} color={blue300} />
                <span>{this.state.ownerDetailsObj.email}</span>
              </div>
              :
              null
            }
            {(this.state.ownerDetailsObj.blog != null && this.state.ownerDetailsObj.blog != "") ?
              <div style={{marginBottom: 10}}>
                <Link style={{marginRight: 15, marginBottom: -7}} color={yellow500} />
                <span>{this.state.ownerDetailsObj.blog}</span>
              </div>
              :
              null
            }
          </div>
          <div style={{flex: '1 0 50%', padding: '5px 15px'}}>
            {ownerRepos}
          </div>
        </div>
      </div>
    );
  }
}
