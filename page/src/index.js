import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.component';
import store from './store/store'

import { Provider } from 'react-redux'

import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
