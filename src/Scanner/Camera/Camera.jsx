import React, {Component} from 'react';
import Worker from './qr.worker.js';
import './Camera.css'

class Camera extends Component {
    constructor(props) {
        super(props);

        this.video = null;
        this.canvas = null;
        this.canvasContext = null;
        this.worker = null;
        this.interval = null;
    }

    componentWillMount() {
        this.worker = new Worker();
    }

    componentDidMount() {
        this.video = document.querySelector('video');
        this.canvas = document.querySelector('canvas');

        this.worker.addEventListener('message', (event) => {
            const code = event.data.data;
            const htmlCode = document.createTextNode(event.data.data);
            document.querySelector('#code').innerHTML = '';
            document.querySelector('#code').appendChild(htmlCode);

            this.props.getCodeCallback(code);
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
                this.video.srcObject = stream;

                this.video.addEventListener('loadedmetadata', (e) => {
                    this.canvas.width = e.target.videoWidth;
                    this.canvas.height = e.target.videoHeight;

                    this.canvasContext = this.canvas.getContext("2d");

                    this.interval = setInterval(() => {
                        const data = this.captureFrame();
                        this.worker.postMessage(data);
                    }, 200);

                });
            });
    }

    captureFrame() {
        this.canvasContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        return this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.video.srcObject = null;
        this.canvas = null;
    }

    render() {
        return (
            <div>
                <video className="camera" autoPlay></video>
                <canvas className="hide"></canvas>
                {/*<div id="code"></div>*/}
            </div>
        )
    }
}

export default Camera;