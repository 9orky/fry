import React, {useEffect, useRef} from 'react';
import Worker from './qr.worker.js';
import styles from './Camera.module.css';

const Camera = (props) => {

    let video = useRef();
    let canvas = useRef();
    let canvasContext = useRef();
    let interval = useRef();

    useEffect(() => {
        let worker = null;
        video.current = document.querySelector('video');
        canvas.current = document.querySelector('canvas');

        worker = new Worker();
        worker.addEventListener('message', (event) => {
            const code = event.data.data;
            props.getCodeCallback(code);
        });

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "environment",
                    // orientation: "landscape"
                },
                audio: false,
            })
            .then((stream) => {
                video.current.srcObject = stream;

                video.current.addEventListener('loadedmetadata', (e) => {
                    canvas.current.width = e.target.videoWidth;
                    canvas.current.height = e.target.videoHeight;

                    canvasContext.current = canvas.current.getContext("2d");

                    interval.current = setInterval(() => {
                        const data = captureFrame();
                        worker.postMessage(data);
                    }, 200);

                });
            });
    }, [props]);


    const captureFrame = () => {
        canvasContext.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
        return canvasContext.current.getImageData(0, 0, canvas.current.width, canvas.current.height);
    };

    useEffect(() => {
        return () => {
            clearInterval(interval.current);
            video.current.srcObject = null;
            canvas.current = null;
        }
    });

    return (
        <div>
            <video className={styles.camera} autoPlay></video>
            <canvas className={styles.hide}></canvas>
            {/*<div id="code"></div>*/}
        </div>
    )
};

export default Camera;
