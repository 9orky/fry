import React from "react";

class CameraButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facingUser: false
        };

    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({facingUser: !this.state.facingUser})
                    this.props.onCameraSwitch(!this.state.facingUser)
                }}>Switch</button>
            </div>
        )
    }
}

export default CameraButtons;