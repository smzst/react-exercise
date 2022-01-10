import React from 'react';
import ReactDOM from 'react-dom';
import {DefaultTypelessProvider} from "typeless";
import CounterModule from "./features/counter/module";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <DefaultTypelessProvider>
    <CounterModule/>
  </DefaultTypelessProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
