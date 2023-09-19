import React, { useEffect } from 'react'
import vid1 from '../videos/vid1.mp4';
import vid2 from '../videos/vid2.mp4';
import vid3 from '../videos/vid3.mp4';

function Ioa() {

    let obersever = new IntersectionObserver(callback, { threshold: 0.6 });

    const callback = (enteries) => {

        enteries.forEach(entry => {

            let ele = entry.target.childNodes[0];
            console.log(ele);

            ele.play().then(()=>{

                if(!ele.paused && ! entry.isIntersecting)
                ele.pause();
            })
        })
    }

    useEffect(() => {

        const element = document.querySelectorAll('.videos');
        element.forEach(element => {

            obersever.observe(element);
        })

    }, [])

    return (
        <div className="video-containers">

            <div className="videos">
                <video src={vid1} muted="muted" style={{ height: '85vh' }} />
            </div>

            <div className="videos">
                <video src={vid2} muted="muted" style={{ height: '85vh' }} />
            </div>

            <div className="videos">
                <video src={vid3} muted="muted" style={{ height: '85vh' }} />
            </div>

        </div>
    )
}

export default Ioa
