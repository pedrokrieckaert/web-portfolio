import React from 'react';
import './portfolio-slideshow.scss';
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
            intervalId: null,
            intervalStart: null,
            timerStep: 10000,
            timeRemain: null
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
                requestAnimationFrame(() =>{
                    this.startTimer();
                    this.timeRemain();
                });
            })
            .catch((error) => {
                console.log('Error; ', error);
            });
    }

    componentWillUnmount(){
        this.clearTimer();
    }

    timeRemain = (timestamp) => {
        timestamp = timestamp || new Date().getTime();
        var duration = this.state.timerStep;
        var start = this.state.intervalStart;
        var runtime = timestamp - start;

        if (runtime < duration){
            requestAnimationFrame( (timestamp) =>{
                this.timeRemain(timestamp);
            });
        }
        requestAnimationFrame(() =>{
            this.setState({
                timeRemain: duration - ( (new Date().getTime() - start))
            });
        });
    }

    //Slideshow auto present
    changeSlide = () => {
        if (this.state.id === this.state.idMax - 1){
            this.setState({id: 0});
            this.setState({activeIndex: 0});
        } else {
            this.setState(prev => {
                return {
                    id: prev.id + 1,
                    activeIndex: prev.activeIndex + 1
                };
            });
        }
        this.setState({intervalStart: (new Date()).getTime()});
    }

    //Slideshow Navigation
    navBullClick = (index) => {
        this.setState({
            activeIndex: index,
            id: index
        });

        //Reset auto show timer
        this.resetTimer();
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
        this.resetTimer();
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
        this.resetTimer();
    }

    //Handles the slideshow timer for modal content
    clearTimer = () => {
        clearInterval(this.state.intervalId);
        cancelAnimationFrame(() =>{
            this.startTimer();
            this.timeRemain();
        });
    }

    startTimer = () =>{
        var intervalId = setInterval(this.changeSlide, this.state.timerStep);
        this.setState({intervalStart: (new Date()).getTime()});
        this.setState({intervalId: intervalId}); 
    }

    resetTimer = () =>{
        clearInterval(this.state.intervalId);
        var intervalId = setInterval(this.changeSlide, this.state.timerStep);
        this.setState({intervalStart: (new Date()).getTime()});
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
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn--next" onClick = {this.navNextSlide}></img>
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn--prev" onClick = {this.navPrevSlide}></img>
                    </div>
                </div>
                <ModalSlideshow projData = {currentProject} clearTimer = {this.clearTimer} startTimer = {this.startTimer}/>
                <div className = "content-nav">
                        {Array.from({
                            length: this.state.idMax},
                            (_, index) => (
                                <Bull index = {index} key = {index} isActive = {this.state.activeIndex === index} onClick = {this.navBullClick} timeRemain = {this.state.timeRemain}/>
                            )
                        )}
                    </div>
            </div>

        );
        
    }
}

export default Slideshow;