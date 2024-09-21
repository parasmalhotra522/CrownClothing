import React, { useState } from 'react';
import './toggleSwitch.styles.css';  // Importing CSS for styling
import { turnOnDarkMode, turnOffDarkMode } from '../../store/DarkMode/darkMode';
import { useDispatch, useSelector } from 'react-redux';

const ToggleSwitch = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const dispatch = useDispatch();
    const storeState = useSelector((state) => state);
    const toggleSwitch = () => {
        setIsLightMode(!isLightMode);  // Toggle between true (Light) and false (Dark)
        // console.log("----CHecking isLightMode", isLightMode);
        if (isLightMode) {
            dispatch(turnOnDarkMode());
        } else {
            dispatch(turnOffDarkMode());
        }
        console.log("--- Checking store state", storeState);
    };

    return (
        <div className="toggle-switch">
            <label className="switch">
                <input type="checkbox"
                    checked={isLightMode}
                    onChange={toggleSwitch} />
                <span className="slider">
                    <span className={isLightMode ? "slider-label-light" : "slider-label-dark"}>
                        {isLightMode ? 'Light' : 'Dark'}
                    </span>
                </span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
