import React from 'react';
import './toggleSwitch.styles.css';  
import { turnOnDarkMode, turnOffDarkMode } from '../../store/DarkMode/darkMode';
import { useDispatch, useSelector } from 'react-redux';

const ToggleSwitch = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.darkModeReducer.isDarkMode);

    const toggleSwitch = () => {
        if (isDarkMode) {
            dispatch(turnOffDarkMode());
        } else {
            dispatch(turnOnDarkMode());
        }
    };

    return (
        <div className="toggle-switch">
            <label className="switch">
                <input type="checkbox"
                    checked={!isDarkMode}  // Invert the checkbox for light mode
                    onChange={toggleSwitch} />
                <span className="slider">
                    <span className={!isDarkMode ? "slider-label-light" : "slider-label-dark"}>
                        {!isDarkMode ? 'Light' : 'Dark'}
                    </span>
                </span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
