import React from 'react';

/*fetch('../data/slideShow.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    var slideShow = JSON.parse(data);
    console.log(slideShow);
  })
  .catch(err => {
    console.log(err);
  })
*/

class Slideshow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [
               {name: "Project 1",
                image: {
                    src: "imgs/testImg.jpg",
                    alt: "Test Image 1"},
                desc: "Lorem Ipsum",
                skills: ["test 1", "test 2", "test 3"]},
                {name: "Project 2",
                image: {
                    src: "imgs/testImg_2.jpg",
                    alt: "Test Image 1"},
                desc: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                skills: ["test 4", "test 5", "test 6"]} 
            ],
            id: 0
        }
    }

    changeSlide = () => {
        this.setState({id: 1});
    }

    render() {
        return(
            <div>
                <div className="content-grid">
                    <div className = "content-head">
                        <h3>Portfolio</h3>
                    </div>
                    <div className = "content-slide">
                    <img class = "slide-img" id = "proj1-img" alt = {this.state.projects[this.state.id].image.alt} src = {this.state.projects[this.state.id].image.src}></img>
                        <h3 className = "slide-head">{this.state.projects[this.state.id].name}</h3>
                        <p className = "slide-desc">{this.state.projects[this.state.id].desc}</p>
                        <ul className = "slide-skill">
                            <li>&bull; {this.state.projects[this.state.id].skills[0]}</li>
                            <li>&bull; {this.state.projects[this.state.id].skills[1]}</li>
                            <li>&bull; {this.state.projects[this.state.id].skills[2]}</li>
                        </ul>
                    </div>
                    <div className = "content-nav">
                        <span>&#9664;</span>
                        <span>&bull;</span>
                        <span>&bull;</span>
                        <span>&bull;</span>
                        <span>&#9654;</span>
                        <button type="button" onClick={this.changeSlide}>Change slide</button>
                    </div>
                </div>
            </div>

        );
        
    }
}

export default Slideshow;