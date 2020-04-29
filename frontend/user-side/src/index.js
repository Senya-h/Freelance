import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(
<BrowserRouter>
    <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <App />
    </ThemeProvider>
</BrowserRouter>,
document.getElementById('root'));


