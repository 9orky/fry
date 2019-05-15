import React from 'react';
import Worker from './qr.worker.js';
import './Camera.css'

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.video = null;
        this.canvas = null;
        this.canvasContext = null;
        this.cameraInterval = null;

        this.state = {
            currentDevice: null
        };
    }

    componentWillMount() {
        this.worker = new Worker();
    }

    componentDidMount() {
        this.video = document.querySelector('video');
        this.canvas = document.querySelector('canvas');
        this.canvasContext = null;

        this.worker.addEventListener('message', (event) => {
            console.log(event.data.data);
        });

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: 'environment'
                },
                audio: false,
            })
            .then((stream) => {
                this.video.srcObject = stream;
                this.canvasContext = this.canvas.getContext("2d");

                this.cameraInterval = setInterval(() => {
                    this.canvas.width = this.video.videoWidth;
                    this.canvas.height = this.video.videoHeight;

                    this.canvasContext.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
                    const imageData = this.canvasContext.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);

                    this.worker.postMessage(imageData);

                }, 200);
            });
    }

    render() {
        return (
            <div>
                <video className={'camera'} autoPlay></video>
                <canvas className={'hide'}></canvas>
            </div>
        )
    }
}

export default Camera;