import React from 'react';
import './bull.css'

class Bull extends React.Component {
    handleClick = () => this.props.onClick(this.props.index);

    render(){
        var offset = (this.props.timeRemain/ (10000/134));

        let animCircle;

        if(this.props.isActive){
            animCircle = <circle className = "stroke-bullet nav-bullet" cx="20" cy="20" r="18" fill="none" stroke="#f77a52" strokeDasharray="134" strokeDashoffset = {20 + offset} transform= "rotate(-90, 20,20)"></circle>
        }

        return(
            <svg className = {this.props.isActive ? 'bull-active' : 'bull-inactive'} onClick = {this.handleClick} width="40" height="40">
		        <circle className = "inner-bullet nav-bullet" cx="20" cy="20" r="18" stroke="#e6e6e6" ></circle>
		        {animCircle}
            </svg>
        );
    }
}

export default Bull;
