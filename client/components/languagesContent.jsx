import React from 'react';

const styles = {
  languageCardStyle: {
    display: 'inline-flex',
    minWidth: '40%',
    margin: 35,
    border: '1px solid #ccc',
    borderRadius: 5,
    boxShadow: '0px 0px 5px #ccc',
    cursor: 'pointer',
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
      languagesList: [
        {'language': 'javascript', 'imgSrc': 'javascript_logo.png'},
        {'language': 'java', 'imgSrc': 'java_logo.png'},
        {'language': 'python', 'imgSrc': 'python_logo.png'},
        {'language': 'php', 'imgSrc': 'php_logo.png'},
        {'language': 'ruby', 'imgSrc': 'ruby_logo.png'}
      ],
    };
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
  }

  handleLanguageClick(selectedLanguage, event){
    this.props.onLanguageClick(selectedLanguage);
  }

  render(){
    var displayLanguagesTitles = [];
    this.state.languagesList.forEach(function (languageObj, i) {
      displayLanguagesTitles.push(
        <div key={i} style={styles.languageCardStyle} onClick={this.handleLanguageClick.bind(this, languageObj.language)} >
          <img src={"./img/" + languageObj.imgSrc} style={styles.languageLogoStyle} />
          <div style={{flex: '0 0 80%'}}>
            <div style={{marginTop: 30, fontWeight: 600, fontSize: 24, color: '#3b7aec'}}>
              {languageObj.language.toUpperCase()}
            </div>
          </div>
        </div>
      );
    }.bind(this));

    return (
      <div style={{textAlign: 'center'}}>
        {displayLanguagesTitles}
      </div>
    );
  }
}
