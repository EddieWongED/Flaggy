import React from "react"
import '../index.css'
import '../style/switch.css'
import '../style/navBar.css'
import '../style/dropdownMenu.css'
import 'flag-icon-css/css/flag-icon.min.css'
import {ThemeContext} from '../Theme';
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

let languages = require("../i18n/languages.json")

const DropdownOptions = (props) => {
    const context = React.useContext(ThemeContext);
    return Object.keys(languages).map((key) => {
        const {countryCode, countryName} = languages[key];
        return ( 
            <a key={key} id={key} theme={context} className="language-a" onClick={() => {i18next.changeLanguage(key)}}>
                <span className={`flag-icon flag-icon-${countryCode} language-flag-span`}/>
                <div className="language-option-div">
                    {countryName} ({key})
                </div>
            </a>   
        )
    })
}

const NavBarOptions = (props) => {
    const {handleThemeClick, navbarshown, list} = props;
    const context = React.useContext(ThemeContext);

    const {t} = useTranslation();

    return (
    <ul ref={list} className="nav-list" theme={context} navbarshown={navbarshown.toString()}>
        <li theme={context}>
            <a className="sidebar-option-a" href="https://github.com/EddieWongED/CountriesList" theme={context} navbarshown={navbarshown.toString()}>
                <div className="nav-option-div">
                    <img className="github_img" theme={context} alt="github_img"/>
                    <span className="links_name">{t("sourceCode")}</span>
                </div>
            </a>
            {/* <span class="tooltip">Source Code</span> */}
        </li>
        <li theme={context}>
            <a className="sidebar-option-a" theme={context} navbarshown={navbarshown.toString()}>
                <div className="nav-option-div">
                    <img className="theme-img" theme={context} alt="theme-img"/>
                    <span className="links_name">{t("darkMode")}</span>
                </div>
                <label className="switch">
                    <input type="checkbox" defaultChecked={context === "dark"} onClick={handleThemeClick} />
                    <span className="slider round"></span>
                </label>
            </a>
            {/* <span class="tooltip">Source Code</span> */}
        </li>
        <li theme={context}>
            <a className="sidebar-option-a" theme={context} navbarshown={navbarshown.toString()}>
                <div className="nav-option-div">
                    <img  className="lang-img" theme={context} alt="lang-img"/>
                    <span className="links_name">{t("language")}</span>
                </div>     
                <div className="dropdown-div">
                    <div className="dropdown-btn-div">
                        <button className="dropdown-btn" theme={context}>{i18next.language}</button>
                        <div className="test"/>
                    </div>
                    <div className="dropdown-content-div" theme={context}>
                        <DropdownOptions/>
                    </div>
                </div>
            </a>
            {/* <span class="tooltip">Source Code</span> */}
        </li>
    </ul>
    )
}
const NavBar = (props) => {
    const context = React.useContext(ThemeContext);
    const [navBarShown, setNavBarShown] = React.useState(true);
    const sideBar = React.useRef(null);
    const list = React.useRef(null);
    const logoImg = React.useRef(null);
    const logoName = React.useRef(null);
    const menu = React.useRef(null);
    const logoContent = React.useRef(null);

    function toggleMenu(e) {
        
        setNavBarShown((prevState) => {
            if (prevState === true) {
                sideBar.current.style.width = "300px";
                
                list.current.style.opacity = "1";
                list.current.style.height = "auto";
                logoImg.current.style.display = "flex"
                logoName.current.style.display = "flex"
                // list.current.style.display = "block"
            } else {
                sideBar.current.style.width = "90px";
                list.current.style.opacity = "0";
                list.current.style.height = "0";
                logoImg.current.style.display = "none"
                logoName.current.style.display = "none"
                // list.current.style.display = "none"
            }
            return !prevState
        })
    }

    return (
        <div ref={sideBar} className="sidebar-div" theme={context}>
            <div ref={logoContent} className="logo-content-div">
                <div ref={logoImg} className="logo-img-div">
                    <img className="logo-img" theme={context} alt="logo-img"/>
                </div>
                <div ref={logoName} className="logo-name-div">Flaggy</div>
                <div ref={menu} className="menu-img-div" onClick={toggleMenu}>
                    <img className="menu-img" theme={context} alt="menu-img"/>
                </div>
            </div>
            <NavBarOptions navbarshown={navBarShown} list={list} handleThemeClick={props.handleThemeClick}/>
            <div className="profile-div">
                <div className="profile-content-div">
                    <div className="profile-name">
                        Eddie Wong
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar