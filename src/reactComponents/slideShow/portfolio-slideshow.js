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

    //Aquire slideshow content when the component is active
    componentDidMount() {
        fetch('https://pedrokrieckaert.github.io/data/slideShow.json')
        //fetch('./data/slideShow.json')
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

    //Clean up timers when the component is being used anymore
    componentWillUnmount(){
        this.clearTimer();
    }

    //Calculates the remaining time for the nav bullet animation
    //the value is passed per available animation frame
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

    //Updates the state variables with the mutated constants
    //Reverse for any function requiring a reversed animation
    setSlideState = (slide1, slide2, id) =>{
        this.setState({
            slide1: slide1,
            slide2: slide2,
            id: id,
            activeIndex: id
        });
    }

    //Sets the slide offscreen slide to the appropiate location for the next animation
    //Example: If the previous slide is called, the function places the off screen slide on the left
    //Timeout is used to give time for a function to complete all it's actions
    prepOffSlide = (reverse) =>{
        const s = this.state.styles,
        slide1 = this.state.slide1,
        slide2 = this.state.slide2,
        id = this.state.id;

        if(slide1["position"] !== s.onScreen){
            if (reverse) {
                slide1["position"] = s.offScreenPrev;
            } else {
                slide1["position"] = s.offScreenNext;
            }
            slide1["transition"] = false;
        } else {
            if (reverse) {
                slide2["position"] = s.offScreenPrev;
            } else {
                slide2["position"] = s.offScreenNext;
            }
            slide2["transition"] = false;
        }

        
        this.setSlideState(slide1, slide2, id);
        this.resetTransition(slide1, slide2, id)

        setTimeout(() => {
            this.changeSlide(reverse);
        }, 500);
    }

    //Rests the transistion boolean after the clean up,
    //Covers both slides, updates the state variables with the new boolean
    //Timeout is to give time for all the changes to occur
    resetTransition = (slide1, slide2, id) =>{
        setTimeout(() => {
            slide1["transition"] = true;
            slide2["transition"] = true;
            this.setSlideState(slide1, slide2, id);
        }, 500);
    }

    //Slideshow slide animator
    //First the "reverse" parameter is used to determine if the slide has to go back, the animation is reversed
    //Based on the active screen, css styles of the local variables are changed, these changes are passed to the state variable through another function
    //The active ID is altered to be that of the next slide
    changeSlide = (reverse) => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles;
        let id;


        if(reverse === true){
            if (slide1["position"] === s.onScreen){
                slide1["position"] = s.offScreenNext;
                slide2["position"] = s.onScreen;
                id = slide2.id;
            } else {
                slide1['position'] = s.onScreen;
                slide2['position'] = s.offScreenNext;
                id = slide1.id;
            }
        } else{
            if (slide1["position"] === s.onScreen){
                slide1["position"] = s.offScreenPrev;
                slide2["position"] = s.onScreen;
                id = slide2.id;
            } else {
                slide1['position'] = s.onScreen;
                slide2['position'] = s.offScreenPrev;
                id = slide1.id;
            }
        }

        this.setSlideState(slide1, slide2, id);

        setTimeout(() => {
            this.updateId();
        }, 1000);

        this.setState({intervalStart: (new Date()).getTime()});
    }

    //Changes the ID of the off screen slide to be the upcoming ID
    updateId = () => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles,
            slides = this.state.idMax,
            id = this.state.id;

            if (slide1["position"] !== s.onScreen) {
                slide1["id"] = slide2.id + 1 === slides ? 0 : slide2.id + 1;
            } else {
                slide2["id"] = slide1.id + 1 === slides ? 0 : slide1.id + 1;
            }

            this.setSlideState(slide1, slide2, id);
    }

    //Slideshow Bullet Navigation
    navBullClick = (index) => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles;

        var reverse = false,
        noSwitch = false;

        if (slide1["position"] === s.onScreen && index !== slide1.id){
            if(index < slide2.id){
                reverse = true;
            }
            slide2.id = index;
        } else  if (slide2["position"] === s.onScreen && index !== slide2.id){
            if(index < slide1.id){
                reverse = true;
            }
            slide1.id = index;
        } else {
            noSwitch = true;
        }

        //Conditional to prevent animation if the same slide is selected
        if(noSwitch === false){
            //Updates the component state variables
            this.setSlideState(slide1, slide2, index);

            //Preps slides for animation
            this.prepOffSlide(reverse);

            //Reset auto show timer
            this.resetTimer();
        }
    }

    //Go to previous slide in the order, ID is updated
    navPrevSlide = () => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles,
            max = this.state.idMax;
        var id = this.state.id;

        if(id === 0){
            id = max - 1;
        }else{
            id = id -1;
        }

        if (slide1["position"] === s.onScreen){
            slide2.id = id;
        } else {
            slide1.id = id;
        }

        //Updates the component state variables
        this.setSlideState(slide1, slide2, id);

        //Handles the slide animation and clean up
        this.prepOffSlide(true);

        //Reset auto show timer
        this.resetTimer();
    }

    //Go to the next slide in the order, ID is updated
    navNextSlide = () => {
        const slide1 = this.state.slide1,
            slide2 = this.state.slide2,
            s = this.state.styles,
            max = this.state.idMax;
        var id = this.state.id;

        if(id === (max - 1)){
            id = 0;
        }else{
            id = id +1;
        }

        if (slide1["position"] === s.onScreen){
            slide2.id = id;
        } else {
            slide1.id = id;
        }

        //Updates the component state variables
        this.setSlideState(slide1, slide2, id);

        //Handles the slide animation and clean up
        this.prepOffSlide(false);

        //Reset auto show timer
        this.resetTimer();
    }

    //Clears all timers and intervals
    clearTimer = () => {
        clearInterval(this.state.intervalId);
        cancelAnimationFrame(() =>{
            this.startTimer();
            this.timeRemain();  
        });
    }

    //Starts all timers and intervals, along with other time based variables
    startTimer = () =>{
        var intervalId = setInterval(this.prepOffSlide, this.state.timerStep);
        this.setState({intervalStart: (new Date()).getTime()});
        this.setState({intervalId: intervalId}); 
    }

    //Resets all timers and intervals, used when the user overides the slideshow timer with navigation inputs
    resetTimer = () =>{
        clearInterval(this.state.intervalId);
        var intervalId = setInterval(this.prepOffSlide, this.state.timerStep);
        this.setState({intervalStart: (new Date()).getTime()});
        this.setState({intervalId: intervalId});
    }


    render() {
        const 
            currentProject = this.state.projects[this.state.id],
            s = this.state.styles,
            slide1 = this.state.slide1,
            slide2 = this.state.slide2;

        var 
            S1Project = this.state.projects[slide1.id],
            S2Project = this.state.projects[slide2.id];
            

        let slideshowDisplay;

        //Conditional logic to prevent rendering of ellements dependant on the fetched data
        if (this.state.idMax !== null){

            slideshowDisplay =
            <div>
                <div className = "content-navOverlay">
                    <div className = "slideshow-container">

                    <Slide 
                    alt = {S1Project.image.alt}
                    src = {S1Project.image.src}
                    position = {slide1.position}
                    transition = {slide1.transition ? s.transition : "none"}
                    />

                    <Slide
                    alt = {S2Project.image.alt}
                    src = {S2Project.image.src}
                    position = {slide2.position}
                    transition = {slide2.transition ? s.transition : "none"}
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
                <h2>There was an error while loading.</h2>
            </div>;
        } 

        return(
            <div style = {{width: window.innerWidth - 16.4 + ' px'}}>
                <h2 className = "content-head">Portfolio</h2>
                {slideshowDisplay}
            </div>

        );
        
    }
}

export default Slideshow;