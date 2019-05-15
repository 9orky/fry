import React from 'react';
import CameraButtons from './CameraButtons';
import QrWorker from './worker.js';

class Camera extends React.Component {
    worker = null;
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
        console.log(this.worker);
        this.worker = QrWorker();
        console.log(this.worker)
    }

    componentDidMount() {
        this.video = document.querySelector('video');
        this.canvas = document.querySelector('canvas');
        this.canvasContext = null;

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

                    const msg = {
                        data: imageData,
                        width: this.video.videoWidth,
                        height: this.video.videoHeight,
                    };

                    this.worker.postMessage(msg)

                }, 200);
            });
    }

    render() {
        return (
            <div>
                <video autoPlay></video>
                <canvas styles={{display: "none"}}></canvas>
                <CameraButtons onCameraSwitch={(facingUser) => {
                    // console.log(facingUser);
                    // this.switchDevice(facingUser);
                }}/>
            </div>
        )
    }
}

export default Camera;