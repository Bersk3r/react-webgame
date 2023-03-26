// require는 node의 모듈 시스템이다.
// const React = require('react');
import React from 'react';
// const ReactDOM = require('react-dom');
import ReactDOM from 'react-dom';
// const NumberBaseBall = require('./NumberBaseBall');
import NumberBaseBall from './NumberBaseBall';

ReactDOM.createRoot(document.querySelector('#root')).render(<NumberBaseBall />);