import React from 'react'
import './Video.css';
import ReactDOM from 'react-dom';

function Video(props) {

    const handleClick = (e) => {

        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll = (e) => {

        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;

        if (next) {
            next.scrollIntoView();
            e.target.muted = true;
        }
    }

    return (
        <div>
            <video src={props.src} className='video-styling' muted="muted"  onClick={handleClick} onEnded={handleScroll}>

            </video>
        </div>
    )
}

export default Video