import React, { memo } from "react";
import "./slide.scss";

const Slide = ({position, transition, src, alt}) => {
    return(
        <div className = {position + " " + transition + " img-container"}>
            <img src = {src} alt = {alt} className = "slide"></img>
        </div>
    )
}

export default memo(Slide);