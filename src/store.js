import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from  './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

export default(initialState) => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    return store;
};