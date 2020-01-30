import React from 'react';
import Bull from './bull'

class Slideshow extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            projects: [{"name": "Test 1",
            "image": {
                "src": "imgs/testImg.jpg",
                "alt": "Test Image 1"},
            "desc": "Lorem Ipsum",
            "skills":["test 1", "test 2", "test 3"]}],
            id: 0,
            idMax: null,
            intervalId: null
        }
    }

    componentDidMount() {
        fetch('data/slideShow.json')
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


            var intervalId = setInterval(this.changeSlide, 5000);
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
        var intervalId = setInterval(this.changeSlide, 5000);
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
        var intervalId = setInterval(this.changeSlide, 5000);
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
        var intervalId = setInterval(this.changeSlide, 5000);
        this.setState({intervalId: intervalId});
    }

    render() {
        return(
            <div>
                <div className="content-grid">
                    <div className = "content-head">
                        <h3>Portfolio</h3>
                    </div>
                    <div className = "content-slide" data-key = {this.state.id}>
                    <img className = "slide-img" id = "proj1-img" alt = {this.state.projects[this.state.id].image.alt} src = {this.state.projects[this.state.id].image.src}></img>
                        <h3 className = "slide-head">{this.state.projects[this.state.id].name}</h3>
                        <p className = "slide-desc">{this.state.projects[this.state.id].desc}</p>
                        <ul className = "slide-skill">
                            {Array.from({
                                length: this.state.projects[this.state.id].skills.length},
                                (_, index) => (
                                    <li key = {index}>&bull; {this.state.projects[this.state.id].skills[index]}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className = "content-nav">
                        <span onClick = {this.navPrevSlide}>&#9664;</span>
                        {Array.from({
                            length: this.state.idMax},
                            (_, index) => (
                                <Bull index = {index} key = {index} isActive = {this.state.activeIndex === index} onClick = {this.navBullClick}></Bull>
                            )
                        )}
                        <span onClick = {this.navNextSlide}>&#9654;</span>
                    </div>
                </div>
            </div>

        );
        
    }
}

export default Slideshow;