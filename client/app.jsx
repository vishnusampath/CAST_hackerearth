import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/mainComponent.jsx';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('content'));
