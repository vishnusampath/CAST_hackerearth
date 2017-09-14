import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header.jsx';
import LanguagesContent from './languagesContent.jsx';
import RepositoriesContent from './repositoriesContent.jsx';
import OwnersContent from './ownersContent.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Home from 'material-ui/svg-icons/action/home';
import {teal500} from 'material-ui/styles/colors';

export default class MainComponent extends React.Component{

  constructor(props){
    super(props);
    this.state={
      contentSelected: 'languages',
      languageSelected: '',
      ownerSelected: '',
    },
    this.handleHomeMenuClick = this.handleHomeMenuClick.bind(this);
    this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
    this.handleOwnerSelect = this.handleOwnerSelect.bind(this);
  };

  handleHomeMenuClick(){
    this.setState({contentSelected: 'languages'})
  }

  handleLanguageSelect(selectedLanguage){
    this.setState({
      contentSelected: 'repositories',
      languageSelected: selectedLanguage,
    })
  }

  handleOwnerSelect(selectedOwner){
    this.setState({
      contentSelected: 'owners',
      ownerSelected: selectedOwner,
    })
  }

  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{height:'100vh'}}>
          <div className="header">
            <Header/>
          </div>
          <div className="menuButtons">
            <FloatingActionButton mini={true} onClick={this.handleHomeMenuClick} style={{marginLeft: 40}} backgroundColor={teal500}>
              <Home />
            </FloatingActionButton>
          </div>
          <div className="content">
            {(this.state.contentSelected == 'languages') ?
              <LanguagesContent languagesRepos={this.state.allLanguagesRepos} onLanguageClick={this.handleLanguageSelect} /> :
               (this.state.contentSelected == 'repositories') ?
                <RepositoriesContent selectedLanguage={this.state.languageSelected} onOwnerClick={this.handleOwnerSelect} /> :
                 <OwnersContent selectedOwnerObj={this.state.ownerSelected} />
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
