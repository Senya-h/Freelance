import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import './assets/css/animate.css';
import './assets/css/magnific-popup.css';
import './assets/css/aos.css';
import './assets/css/ionicons.min.css';
import './assets/css/flaticon.css';
import './assets/css/icomoon.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(<BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline /> 
                        <App />
                    </ThemeProvider>
                </BrowserRouter>,
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
