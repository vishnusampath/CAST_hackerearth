import React from 'react';
import Star from 'material-ui/svg-icons/toggle/star';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {yellow500, teal200, teal500} from 'material-ui/styles/colors';

const styles = {
  reposCardStyle: {
    padding: '16px 15px',
  },
  languageLogoStyle: {
    height: 100,
    borderRight: '1px solid #ccc',
  },
}

export default class Content extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      languageReposObj: {},
      reposToDisplay: [],
      selectedPageIndex: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleOwnerClick = this.handleOwnerClick.bind(this);
  }

  componentWillMount(){
    // Request to fetch repositories of the language selected
    $.ajax({
      type: "GET",
      url: "https://api.github.com/search/repositories?q=" + this.props.selectedLanguage,
      success: function(reposResult){
        var firstReposToDisplay = reposResult.items.slice(0, 9);
        this.setState({
          languageReposObj: reposResult,
          reposToDisplay: firstReposToDisplay,
        })
      }.bind(this),
      error: function(err) {
        console.log("Error while fetching repos of ", this.props.selectedLanguage, " :: ", err);
      }.bind(this)
    });
  }

  handlePageClick(page_index, event){
    var startIndex = page_index * 9;
    var endIndex = (this.state.languageReposObj.items.length < (page_index + 1) * 9 ? this.state.languageReposObj.items.length : (page_index + 1) * 9);
    var reposToDisplay = this.state.languageReposObj.items.slice(startIndex, endIndex);
    this.setState({
      selectedPageIndex: page_index,
      reposToDisplay: reposToDisplay,
    });
    window.scrollTo(0, 0);
  }

  handleOwnerClick(repoObj_of_owner, event){
    this.props.onOwnerClick(repoObj_of_owner);
  }

  render(){
    var displayLanguageRepos = [];
    this.state.reposToDisplay.forEach(function (repoObj, i) {
      var timestamp = new Date(repoObj.updated_at);
      var updated_on_date = timestamp.toString().split(' ').slice(1, 4).join(' ');
      var updated_at_time = ('0' + timestamp.getHours()).slice(-2) + ":" + ('0' + timestamp.getMinutes()).slice(-2);

      displayLanguageRepos.push(
        <div key={i} style={styles.reposCardStyle} >
          <div style={{display: 'flex'}}>
            <div style={{fontWeight: 'bold', flex: '30%', fontSize: 20, marginBottom: 8, fontStyle: 'italic'}}>
              <a onClick={this.handleOwnerClick.bind(this, repoObj)}>{repoObj.full_name}</a>
            </div>
            <div style={{flex: '0 0 35%', display: 'flex'}}>
              <div style={{flex: '10%', color: '#04b098'}}>{repoObj.language}</div>
              <div style={{flex: '0 0 25%', color: '#666666'}}>
                <Star style={{marginRight: 10, marginBottom: -7}} color={yellow500} />
                {((repoObj.stargazers_count < 1000) ? repoObj.stargazers_count : (repoObj.stargazers_count / 1000).toFixed(1)) + 'k'}
              </div>
            </div>
          </div>
          <p style={{fontStyle: 'italic', color: '#2f4f4f'}}>{repoObj.description}</p>
          <p style={{color: '#708090'}}>Updated on {updated_on_date} at {updated_at_time}.</p>
          <hr />
        </div>
      );
    }.bind(this));

    var paginationLinks = null;
    if (this.state.languageReposObj.hasOwnProperty('items')) {
      paginationLinks = [];
      var pages_count = Math.floor(this.state.languageReposObj.items.length / 9) + ((this.state.languageReposObj.items.length % 9) ? 1 : 0);
      for (var i = 0; i < pages_count; i++) {
        paginationLinks.push(
          <div key={i} style={{display: 'inline'}}>
            <FloatingActionButton mini={true} onClick={this.handlePageClick.bind(this, i)} style={{marginRight: 30}} backgroundColor={(this.state.selectedPageIndex == i) ? teal200 : teal500}>
              <span style={{color: 'white'}}>{i+1}</span>
            </FloatingActionButton>
          </div>
        );
      }
    }

    return (
      <div style={{padding: "0px 50px"}}>
        <h3 style={{fontWeight: 'bold', color: '#38947e'}}>
          {(this.state.languageReposObj.hasOwnProperty('items')? this.state.languageReposObj.items.length : 0)} repository results
        </h3>
        {
          (this.state.languageReposObj.hasOwnProperty('items') && this.state.languageReposObj.items.length > 0) ?
            null
            :
            <div>Loading ...</div>
        }
        <hr />
        <div>
          {displayLanguageRepos}
        </div>
        <div style={{textAlign: 'center', marginBottom: 30}}>
          {paginationLinks}
        </div>
      </div>
    );
  }
}
