import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './reducer/rootReducer.js';
import { createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
  }

  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

let persistor = persistStore(store);

ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><App/>
</PersistGate></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
