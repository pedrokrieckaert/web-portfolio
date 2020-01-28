import React from 'react';

fetch('../data/slideShow.json')
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

function port_slide(){
    return (
            <div>
                <div className="content-grid">
                    <div className = "content-head">
                        <h3>Portfolio</h3>
                    </div>
                    <div className = "content-slide">
                        <img className = "slide-img" id = "proj1-img" alt = "testing" src = ""></img>
                        <h3 className = "slide-head">Project 1</h3>
                        <p className = "slide-desc" id = "proj1-desc">Dori me Interimo, adapare Dori me Ameno Ameno Latire Latiremo Dori me Interimo, adapare Dori me Ameno Ameno Latire Latiremo Dori me Interimo, adapare Dori me Ameno Ameno Latire Latiremo</p>
                        <ul className = "slide-skill">
                            <li>&bull; Hi, there</li>
                            <li>&bull; Oh, hello</li>
                            <li>&bull; How's it going?</li>
                        </ul>
                    </div>
                    <div className = "content-nav">
                        <span>&#9664;</span>
                        <span>&bull;</span>
                        <span>&bull;</span>
                        <span>&bull;</span>
                        <span>&#9654;</span>
                    </div>
                </div>
            </div>

    );
}

export default port_slide;