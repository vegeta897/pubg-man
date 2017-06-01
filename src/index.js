import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { orange, yellow, red } from 'material-ui/styles/colors';
import 'typeface-roboto';
import Store from './store';

const StoreInstance = Store();

const theme = createMuiTheme({
    palette: createPalette({
        type: 'dark',
        primary: orange,
        accent: yellow,
        error: red
    })
});

ReactDOM.render(
    <Provider store={StoreInstance}><MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider></Provider>,
    document.getElementById('root')
);

if(module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ReactDOM.render(
            <Provider store={StoreInstance}><MuiThemeProvider theme={theme}>
                <NextApp />
            </MuiThemeProvider></Provider>,
            document.getElementById('root')
        );
    });
}
registerServiceWorker();