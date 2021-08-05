/* eslint-disable */
import React from "react"
import '../index.css'
import '../style/switch.css'
import '../style/navBar.css'
import '../style/dropdownMenu.css'
import 'flag-icon-css/css/flag-icon.min.css'
import {ThemeContext} from '../Theme';
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import logo from "../icons/logo.svg"

let languages = require("../i18n/languages.json")

const DropdownOptions = (props) => {
    const context = React.useContext(ThemeContext);
    return Object.keys(languages).map((key) => {
        const {countryCode, countryName} = languages[key];
        return ( 
            <a 
            key={key} 
            id={key} 
            theme={context}
            className="language-a"
            onClick={() => {i18next.changeLanguage(key)}}>
                <span
                className={`flag-icon flag-icon-${countryCode} language-flag-span`}/>
                <div
                className="language-option-div">
                    {countryName} ({key})
                </div>
            </a>   
        )
    })
}

const NavBarOptions = (props) => {
    const {handleThemeClick, navBarShown} = props;
    const context = React.useContext(ThemeContext);

    const {t} = useTranslation();

    return (
    <ul
    className="nav-option-ul"
    theme={context}
    navBarShown={navBarShown.toString()}>
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}>
            <a
            className="github-link-a"
            href="https://github.com/EddieWongED/CountriesList"
            target="_blank">
                <div
                className="nav-option-div">
                    <div
                    className="nav-option-img-div">
                        <img
                        className="github-img"
                        theme={context}
                        alt="github-img"/>
                    </div>
                    <span
                    className="nav-option-name"
                    navBarShown={navBarShown.toString()}>
                        {t("sourceCode")}
                    </span>
                </div>
            </a>
        </li>
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}>
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
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}>
            <div
            className="nav-option-div">
                <div
                className="nav-option-img-div">
                    <img
                    className="lang-img"
                    theme={context}
                    alt="lang-img"/>
                </div>
                <span
                className="nav-option-name"
                navBarShown={navBarShown.toString()}>
                    {t("language")}
                </span>
            </div>     
            <div
            className="dropdown-div"
            navBarShown={navBarShown.toString()}>
                <div
                className="dropdown-btn-div">
                    <button
                    className="dropdown-btn"
                    theme={context}>
                        {i18next.language}
                    </button>
                    <div
                    className="test"/>
                </div>
                <div
                className="dropdown-content-div"
                theme={context}>
                    <DropdownOptions/>
                </div>
            </div>
        </li>
    </ul>
    )
}
const NavBar = (props) => {
    const {navBarShown, setNavBarShown} = props;
    const context = React.useContext(ThemeContext);

    return (
        <div
        className="sidebar-div no-select"
        theme={context}
        navBarShown={navBarShown.toString()}>
            <NavBarOptions
            navBarShown={navBarShown}
            handleThemeClick={props.handleThemeClick}/>
        </div>
    )
}

export default NavBar