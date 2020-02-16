import React from 'react';
import './port-slide.css';
import Bull from './slide-modal/bull';
import ModalSlideshow from './slide-modal/modal-slideshow';
import LiArray from '../globalComponents/liArray';
import Media from '../globalComponents/media';

class Slideshow extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            projects: [{"name": "temp project",
            "image": {
                "src": "imgs/testImg.jpg",
                "alt": "temp Image 1"},
            "desc": "Lorem Ipsum",
            "skills":["temp 1", "temp 2", "temp 3"],
            "detaildesc":"temp"}],
            id: 0,
            idMax: null,
            intervalId: null
        }
    }

    componentDidMount() {
        //fetch('https://pedrokrieckaert.github.io/data/slideShow.json')
        fetch('./data/slideShow.json')
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this.setState({
                    projects: responseJson.projects,
                    idMax: responseJson.projects.length,
                    activeIndex: 0
                });
            });


            var intervalId = setInterval(this.changeSlide, 10000);
            this.setState({intervalId: intervalId});
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    //Slideshow auto present
    changeSlide = () => {
        if (this.state.id === this.state.idMax - 1){
            this.setState({id: 0});
            this.setState({activeIndex: 0})
        } else {
            this.setState(prev => {
                return {
                    id: prev.id + 1,
                    activeIndex: prev.activeIndex + 1
                };
            });
        }
        
    }

    //Slideshow Navigation
    navBullClick = (index) => {
        this.setState({
            activeIndex: index,
            id: index
        });

        //Reset auto show timer
        clearInterval(this.state.intervalId);
        var intervalId = setInterval(this.changeSlide, 10000);
        this.setState({intervalId: intervalId});
    }

    navPrevSlide = () => {
        if(this.state.id === 0){
            this.setState({
                id: this.state.idMax - 1,
                activeIndex: this.state.idMax - 1
            })
        }else{
            this.setState(prev =>{
                return{
                    id: prev.id - 1,
                    activeIndex: prev.activeIndex -1
                };
            });
        }

        //Reset auto show timer
        clearInterval(this.state.intervalId);
        var intervalId = setInterval(this.changeSlide, 10000);
        this.setState({intervalId: intervalId});
    }

    navNextSlide = () => {
        if(this.state.id === this.state.idMax - 1){
            this.setState({
                id: 0,
                activeIndex: 0
            })
        }else{
            this.setState(prev =>{
                return{
                    id: prev.id + 1,
                    activeIndex: prev.activeIndex + 1
                };
            });
        }

        //Reset auto show timer
        clearInterval(this.state.intervalId);
        var intervalId = setInterval(this.changeSlide, 10000);
        this.setState({intervalId: intervalId});
    }

    //Handles the slideshow timer for modal content
    clearTimer = () => {
        clearInterval(this.state.intervalId);
    }

    startTimer = () =>{
        var intervalId = setInterval(this.changeSlide, 10000);
        this.setState({intervalId: intervalId}); 
    }

    render() {
        var currentProject = this.state.projects[this.state.id];

        return(
            <div>
                <div className="content-grid">
                    <div className = "content-head">
                        <h2>Portfolio</h2>
                    </div>
                    <div className = "content-navOverlay">
                        <div className = "content-slide">
                            <Media class = "slide-img" imgAlt = {currentProject.image.alt} imgSrc = {currentProject.image.src} vidSrc = {currentProject.video} clearTimer = {this.clearTimer} startTimer = {this.startTimer}></Media>
                            <h3 className = "slide-head">{currentProject.name}</h3>
                            <p className = "slide-desc">{currentProject.desc}</p>
                            <LiArray class = "slide-skill" list = {currentProject.skills}></LiArray>
                        </div>
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn" id = "next" onClick = {this.navNextSlide}></img>
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn" id = "prev" onClick = {this.navNextSlide}></img>
                    </div>
                </div>
                <ModalSlideshow projData = {currentProject} clearTimer = {this.clearTimer} startTimer = {this.startTimer}/>
                <div className = "content-nav">
                        {Array.from({
                            length: this.state.idMax},
                            (_, index) => (
                                <Bull index = {index} key = {index} isActive = {this.state.activeIndex === index} onClick = {this.navBullClick}/>
                            )
                        )}
                    </div>
            </div>

        );
        
    }
}

export default Slideshow;