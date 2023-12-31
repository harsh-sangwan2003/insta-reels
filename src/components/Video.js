import React from 'react'
import './Video.css';
import ReactDOM from 'react-dom';

function Video(props) {

    const handleClick = (e) => {

        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll = (e) => {

        e.target.muted = true;

        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;

        if (next) {
            next.scrollIntoView();
            e.target.muted = true;
        }

    }

    return (
        <div>
            <video src={props.src} className='video-styling' controls muted="muted" onClick={handleClick} onEnded={handleScroll} autoplay={true}>

            </video>
        </div>
    )
}

export default Video