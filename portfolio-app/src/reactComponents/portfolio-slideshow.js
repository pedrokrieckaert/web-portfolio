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

var data = {
    "projects":[
        {"name": "Project 1",
        "image": {
            "src": require("../imgs/testImg.jpg"),
            "alt": 'Test Image'
            },
        "desc": "Lorem Ipsum",
        "skills":["test 1", "test 2", "test 3"]},
        {"name": "Project 2",
        "image": { 
            "src": require("../imgs/testImg.jpg"),
            "alt": 'Test Image'
            },
        "desc": "Lorem Ipsum",
        "skills":["test 1", "test 2", "test 3"]}
    ]
}

class Slideshow extends React.Component{
    constructor(props){
        super(props);
        this.state = 0
    }

    changeSlide = () => {
        this.setState(1);
    }

    render() {
        return(
            <div>
                <div className="content-grid">
                    <div className = "content-head">
                        <h3>Portfolio</h3>
                    </div>
                    <div className = "content-slide">
                        <div className = "slide-img">
                            <div style= {{"background": `url(${data.projects[this.state].image.src})`}}></div>
                        </div>
                        <h3 className = "slide-head">{data.projects[this.state].name}</h3>
                        <p className = "slide-desc">{data.projects[this.state].desc}</p>
                        <ul className = "slide-skill">
                            <li>&bull; {data.projects[this.state].skills[0]}</li>
                            <li>&bull; {data.projects[this.state].skills[1]}</li>
                            <li>&bull; {data.projects[this.state].skills[2]}</li>
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