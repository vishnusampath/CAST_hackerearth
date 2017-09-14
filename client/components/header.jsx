import React from 'react';

const styles = {
  headerContainerStyle: {
    display: 'inline-flex',
    margin: 8,
  },
  headerLogoStyle: {
    height: 70,
  },
  headerTitleContainerStyle: {
    margin: '0px 30px',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  headerTitleStyle: {
    fontWeight: 600,
    fontFamily: 'monospace',
    color: 'darkcyan',
    fontSize: 34,
  },
}

export default class Header extends React.Component {

  render(){
    return (
      <div>
        <div style={styles.headerContainerStyle}>
          <img src="./img/CAST_logo.jpg" style={styles.headerLogoStyle} />
          <div style={styles.headerTitleContainerStyle}>
            <p style={styles.headerTitleStyle}>Techscan</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
