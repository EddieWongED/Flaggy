import React from 'react'
import '../../index.css'
import '../../style/navBar.css'
import '../../style/switch.css'
import { ThemeContext } from '../../Theme';
import { useTranslation } from 'react-i18next'

const Theme = (props) => {
    const context = React.useContext(ThemeContext);
    const {navBarShown, handleThemeClick} = props;
    const {t} = useTranslation();

    return (
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}
        onClick={navBarShown ? null : handleThemeClick}>
            <div
            className="nav-option-div">
                <div
                className="nav-option-img-div">
                    <img
                    className="theme-img"
                    theme={context}
                    alt="theme-img"/>
                </div>
                <span
                className="nav-option-name"
                navBarShown={navBarShown.toString()}>
                    {t("darkMode")}
                </span>
            </div>
            <div
            className="theme-switch-div">
                <label
                className="switch"
                navBarShown={navBarShown.toString()}>
                    <input
                    type="checkbox"
                    defaultChecked={context === "dark"}
                    onClick={handleThemeClick}/>
                    <span
                    className="slider round">
                    </span>
                </label>
            </div>
        </li>
    )
}

export default Theme;