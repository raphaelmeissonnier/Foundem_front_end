import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./Components/Header";
import { Provider } from 'react-redux'
import rootReducer from "./reducers/";
import Auth from "./Auth";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Header from "./Components/Header2";
import Footer from "./Components/Footer";


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
    <Provider store={store}>
        {/*Rendu du Header et Footer*/}
        <Header />
        <Footer />
        <Auth />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
