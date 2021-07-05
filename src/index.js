import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App.js'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/iconfont/iconfont.css'
import './assets/fonts/iconfont.css'
import './css/index.css'
import 'react-virtualized/styles.css'
ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
  document.getElementById('root')
);
