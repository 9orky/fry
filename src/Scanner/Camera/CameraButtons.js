import React, {useState} from "react";

const CameraButtons = (props) => {
    const [facingUser, setFacingUser] = useState(false);

    return (
        <div>
            <button onClick={() => {
                setFacingUser(!facingUser);
                props.onCameraSwitch(!facingUser)
            }}>Switch</button>
        </div>
    )
};

export default CameraButtons;