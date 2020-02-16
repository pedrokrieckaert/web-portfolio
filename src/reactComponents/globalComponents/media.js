import React from 'react';
import './mediaComp.css'

class Media extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            vidActive: false
        }
    }

    componentDidUpdate(preProps){
        if(this.props.imgSrc !== preProps.imgSrc){
            this.setState({
                vidActive: false
            });
        }
    }

    activeVideo = () =>{
        this.setState({
            vidActive: true
        });
    }

    render(){
        let imgVid;
        if(this.props.vidSrc != null){
            if(this.state.vidActive === false){
                imgVid = 
                <div className = "mediaComp-container" onClick = {this.activeVideo}>
                    <img className = "mediaComp-img" src = {this.props.imgSrc} alt = {this.props.imgAlt}></img>
                    <div className = "mediaComp-overlay">
                        <img className = "mediaComp-playBtn" src = "./imgs/globalMedia/play.svg" alt = "Play Icon"></img>
                    </div>
                </div>
            } else {
                imgVid = 
                <video className = "mediaComp-video" onPlay = {this.props.clearTimer} onPause = {this.props.startTimer} autoPlay muted controls>
                    <source src = {this.props.vidSrc} type = "video/mp4"></source>
                </video>;
            }

        } else {
            imgVid = <img className = "mediaComp-img" src = {this.props.imgSrc} alt = {this.props.imgAlt}></img>;
        }
        return(
            <div className = {this.props.class}>{imgVid}</div>
        );
    }
}

export default Media;