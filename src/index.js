import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Slideshow from './reactComponents/slideShow/portfolio-slideshow';
import WorkExp from './reactComponents/experienceWorkEdu/portfolio-workExp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Slideshow />, document.getElementById('content-protfolio'));
ReactDOM.render(<WorkExp />, document.getElementById('content-workexperience'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
