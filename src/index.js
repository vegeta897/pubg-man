import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import Store from './store';

const StoreInstance = Store();

ReactDOM.render(
    <Provider store={StoreInstance}><App /></Provider>,
    document.getElementById('root')
);

if(module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ReactDOM.render(
            <Provider store={StoreInstance}><NextApp /></Provider>,
            document.getElementById('root')
        );
    });
}
registerServiceWorker();