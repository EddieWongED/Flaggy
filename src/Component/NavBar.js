/* eslint-disable */
import React from "react"
import '../index.css'
import '../style/navBar.css'
import '../style/dropdownMenu.css'
import {ThemeContext} from '../Theme';
import { useTranslation } from 'react-i18next'
import HomePage from './NavBarOptions/HomePage'
import GitHub from './NavBarOptions/GitHub'
import Theme from './NavBarOptions/Theme'
import Language from './NavBarOptions/Language'
import WorldMap from './NavBarOptions/WorldMap'

const NavBarOptions = (props) => {
    const {handleThemeClick, navBarShown, setNavBarShown} = props;
    const context = React.useContext(ThemeContext);

    const {t} = useTranslation();

    return (
    <ul
    className="nav-option-ul"
    theme={context}
    navBarShown={navBarShown.toString()}>
        <HomePage
        navBarShown={navBarShown}/>
        <GitHub
        navBarShown={navBarShown}/>
        <Theme
        navBarShown={navBarShown}
        handleThemeClick={handleThemeClick}/>
        <Language
        navBarShown={navBarShown}
        setNavBarShown={setNavBarShown}/>
        <WorldMap
        navBarShown={navBarShown}/>
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
            setNavBarShown={setNavBarShown}
            handleThemeClick={props.handleThemeClick}/>
        </div>
    )
}

export default NavBar