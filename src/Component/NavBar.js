import React, { Component } from "react"
import '../index.css'
import '../style/switch.css'
import '../style/navBar.css'
import {ThemeContext} from '../Theme';

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
                    <img className="logo-img" theme={context}/>
                </div>
                <div ref={logoName} className="logo-name-div">Flaggy</div>
                <div ref={menu} className="menu-img-div" onClick={toggleMenu}>
                    <img className="menu-img"theme={context}/>
                </div>
            </div>
            <ul ref={list} className="nav-list" theme={context} navBarShown={navBarShown.toString()}>
                <li theme={context}>
                    <a href="https://github.com/EddieWongED/CountriesList" theme={context}>
                        <img className="github_img" theme={context}/>
                        <span className="links_name">Source Code</span>
                    </a>
                    {/* <span class="tooltip">Source Code</span> */}
                </li>
                <li theme={context}>
                    <a href="#" theme={context}>
                        <img className="theme-img" theme={context}/>
                        <span className="links_name">Dark Mode</span>
                        <label class="switch">
                            <input type="checkbox" defaultChecked={context === "dark"} onClick={props.handleThemeClick} />
                            <span class="slider round"></span>
                        </label>
                    </a>
                    {/* <span class="tooltip">Source Code</span> */}
                </li>
                <li theme={context}>
                    <a href="#" theme={context}>
                        <img  className="settings-img" theme={context}/>
                        <span className="links_name">Settings</span>
                    </a>
                    {/* <span class="tooltip">Source Code</span> */}
                </li>
            </ul>
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