import React from 'react';

class LiArray extends React.Component{

    render(){
        return(
        <ul className = {this.props.class}>
            {Array.from({
                length: this.props.list.length},
                (_, index) => (
                    <li key = {index}>&bull; {this.props.list[index]}</li>
                )
            )}
        </ul>
        );
    }
}

export default LiArray;