import React, { Component } from 'react';
import '../../src/App.css';

import HeadShake from 'react-reveal/HeadShake';
import Fade from 'react-reveal/Fade';


class VideoYT extends Component{
    render(){
        return(

        <div className="block">
            <h2>
                CHECK OUT THE FOLLOWING NEEDS ON HOW TO BE US
            </h2>

            <HeadShake><iframe id="youtubevid1" width="854" height="480" src="https://www.youtube.com/embed/wWhdSVUsnxY"  allow="autoplay; encrypted-media" allowfullscreen></iframe></HeadShake>
        </div>

        )
    }
}

export default VideoYT


