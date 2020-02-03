import React from 'react';

class Bull extends React.Component {
    handleClick = () => this.props.onClick(this.props.index)

    render(){
        return(
            <span className = {this.props.isActive ? 'active' : 'inActive'} onClick = {this.handleClick}>
                &bull;
            </span>
        );
    }
}

export default Bull;
