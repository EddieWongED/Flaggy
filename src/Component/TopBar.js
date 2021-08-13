import React from "react"
import '../index.css'
import '../style/topbar.css'
import "../style/miscellaneous.css"
import {ThemeContext} from '../Theme';
import logo from "../icons/logo.svg"
import menuIconDark from "../icons/dark/menu.svg"
import menuIconLight from "../icons/light/menu.svg"
import { Link } from "react-router-dom";

const TopBar = (props) => {
    const {setNavBarShown} = props;
    const context = React.useContext(ThemeContext);

    function handleMenuClick() {
        setNavBarShown((prevState) => {
            return !prevState;
        })
    }

    return (
        <div 
        className="top-bar-div no-select" theme={context}>
                <div
                className="top-bar-content-div">
                    <img
                    className="top-bar-menu-img" 
                    alt="top-bar-menu-img"
                    src={context === "dark" ? menuIconDark : menuIconLight}
                    height="24"
                    width="24"
                    onClick={handleMenuClick}
                    draggable={false}/>
                    <Link
                    to="/"
                    className="no-hyperlink-effect"
                    style={{marginLeft: "40px"}}>
                        <div
                        className="top-bar-logo-name-div">
                            <img
                            className="top-bar-logo-img"
                            alt="top-bar-logo-img"
                            src={logo}
                            height="32"
                            width="32"/>
                            <div
                            className="top-bar-logo-name-div">
                                Flaggy
                            </div>
                        </div>
                    </Link>
                </div>
            <div 
            className="horizontal-line top-bar-horizontal-line" 
            theme={context}/>
        </div>
    );
}

export default TopBar;