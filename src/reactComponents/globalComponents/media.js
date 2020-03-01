import React from 'react';
import './media.scss'

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
                <div className = {"mediaComp-container " + this.props.position + " " + this.props.transition} onClick = {this.activeVideo}>
                    <img className = "mediaComp--img" src = {this.props.imgSrc} alt = {this.props.imgAlt}></img>
                    <div className = "mediaComp-overlay">
                        <img className = "mediaComp-playBtn" src = "./imgs/globalMedia/play.svg" alt = "Play Icon"></img>
                    </div>
                </div>;
            } else {
                imgVid = 
                <video className = "mediaComp--video" onPlay = {this.props.clearTimer} onPause = {this.props.startTimer} autoPlay muted>
                    <source src = {this.props.vidSrc} type = "video/mp4"></source>
                </video>;
            }

        } else {
            imgVid = 
            <div className= {"mediaComp-container " + this.props.position + " " + this.props.transition}>
                <img className = "mediaComp--img" src = {this.props.imgSrc} alt = {this.props.imgAlt}></img>
            </div>
        }
        return(
            <div>{imgVid}</div>
        );
    }
}

export default Media;