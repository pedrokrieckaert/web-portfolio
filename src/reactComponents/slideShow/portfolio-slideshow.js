import React from 'react';
import './portfolio-slideshow.scss';
import Bull from './slide-modal/bull';
import ModalSlideshow from './slide-modal/modal-slideshow';
import LiArray from '../globalComponents/liArray';
import Slide from './slide';
//import Media from '../globalComponents/media';

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
            slide1: {
                id: 0,
                position: "left-cur",
                transition: true
            },
            slide2: {
                id: 1,
                position: "left-next",
                transition: true
            },
            styles: {
                onScreen: "left-cur",
                offScreenNext: "left-next",
                offScreenPrev: "left-prev",
                transition: "transition-left1"
            },
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

    setSlideState = (slide1, slide2, id) =>{
        this.setState({
            slide1: slide1,
            slide2: slide2,
            id: id
        });
    }

    //Slideshow auto present
    changeSlide = () => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles;
        let id;

        if (slide1["position"] === s.onScreen){
            slide1["position"] = s.offScreenPrev;
            slide2["position"] = s.onScreen;
            id = slide1.id;
        } else {
            slide1['position'] = s.onScreen;
            slide2['position'] = s.offScreenPrev;
            id = slide2.id;
        }

        this.setSlideState(slide1, slide2, id);
        setTimeout(() => {
            this.resetPrevSlide();
        }, 1000);

        this.setState({intervalStart: (new Date()).getTime()});
    }

    resetPrevSlide = () => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles,
            slides = this.state.idMax,
            id =this.state.id;

            if (slide1["position"] === s.offScreenPrev) {
                slide1["transition"] = false;
                slide1["position"] = s.offScreenNext;
                slide1["id"] = slide2.id + 1 === slides ? 0 : slide2.id + 1;
            } else {
                slide2["transition"] = false;
                slide2["position"] = s.offScreenNext;
                slide2["id"] = slide1.id + 1 === slides ? 0 : slide1.id + 1;
            }

            this.setSlideState(slide1, slide2, id);
            this.resetTransition(slide1, slide2, id)
    }

    resetTransition = (slide1, slide2, id) =>{
        setTimeout(() => {
            slide1["transition"] = true;
            slide2["transition"] = true;
            this.setSlideState(slide1, slide2, id);
        }, 500);
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
        const currentProject = this.state.projects[this.state.id],
            s = this.state.styles,
            slide1 = this.state.slide1,
            slide2 = this.state.slide2;
        var nextProject = this.state.projects[this.state.slide2.id];
        let slideshowDisplay;
        if (this.state.idMax !== null){
            slideshowDisplay =
            <div>
                <div className = "content-navOverlay">
                    <div className = "slideshow-container">
                        <Slide 
                            alt = {currentProject.image.alt}
                            src = {currentProject.image.src}
                            position = {slide1.position}
                            transition = {slide1.transition ? s.transition : ""}
                        /> 
                        <Slide
                            alt = {nextProject.image.alt}
                            src = {nextProject.image.src}
                            position = {slide2.position}
                            transition = {slide2.transition ? s.transition : ""}
                        />
                        <div className = "slide-textOverlay">
                            <h2 className = "slide-head">{currentProject.name}</h2>
                            <LiArray class = "slide-text--skill" list = {currentProject.skills}></LiArray>
                            <p className = "slide-text--desc">{currentProject.desc}</p>
                            <ModalSlideshow projData = {currentProject} clearTimer = {this.clearTimer} startTimer = {this.startTimer}/>
                        </div>
                    </div>
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn--next" onClick = {this.navNextSlide}></img>
                        <img src = "./imgs/globalMedia/next.svg" alt = "next/prev button" className = "nav-btn--prev" onClick = {this.navPrevSlide}></img>
                    </div>
                    <div className = "content-nav">
                        {Array.from({
                            length: this.state.idMax},
                            (_, index) => (
                                <Bull index = {index} key = {index} isActive = {this.state.activeIndex === index} onClick = {this.navBullClick} timeRemain = {this.state.timeRemain}/>
                            )
                        )}
                    </div>
                </div>;
        } else {
            slideshowDisplay = 
            <div>
                <h2>Hold this L</h2>
            </div>;
        } 

        return(
            <div className ="flex-container">
                <h2 className = "content-head">Portfolio</h2>
                <div className = "slideshow-flex">
                    {slideshowDisplay}
                </div>
            </div>

        );
        
    }
}

export default Slideshow;