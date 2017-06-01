import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'typeface-roboto';
import Store from './store';

injectTapEventPlugin();

const StoreInstance = Store();

ReactDOM.render(
    <Provider store={StoreInstance}><MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
    </MuiThemeProvider></Provider>,
    document.getElementById('root')
);

if(module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ReactDOM.render(
            <Provider store={StoreInstance}><MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <NextApp />
            </MuiThemeProvider></Provider>,
            document.getElementById('root')
        );
    });
}
registerServiceWorker();