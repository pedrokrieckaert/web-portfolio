import React from 'react';
import './bull.css'

class Bull extends React.Component {
    handleClick = () => this.props.onClick(this.props.index);

    render(){
        var offset = (this.props.timeRemain/25);

        return(
            <svg className = {this.props.isActive ? 'bull-active' : 'bull-inactive'} onClick = {this.handleClick} width="120" height="120">
		        <circle className = "inner-bullet nav-bullet" cx="60" cy="60" r="54" stroke="#e6e6e6" ></circle>
		        <circle className = "stroke-bullet nav-bullet" cx="60" cy="60" r="54" fill="none" stroke="#f77a52" strokeDasharray="400" strokeDashoffset = {offset + 2.4} transform= "rotate(-90, 60,60)"></circle>
            </svg>
        );
    }
}

export default Bull;
