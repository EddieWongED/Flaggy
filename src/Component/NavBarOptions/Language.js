import React from 'react'
import '../../index.css'
import '../../style/navBar.css'
import 'flag-icon-css/css/flag-icon.min.css'
import i18next from 'i18next'
import { ThemeContext } from '../../Theme';
import { useTranslation } from 'react-i18next'

let languages = require("../../i18n/languages.json")

const DropdownOptions = (props) => {
    const context = React.useContext(ThemeContext);
    return Object.keys(languages).map((key) => {
        const {countryCode, countryName} = languages[key];
        return ( 
            <div 
            key={key} 
            id={key} 
            theme={context}
            className="language-div"
            onClick={() => {i18next.changeLanguage(key)}}>
                <span
                className={`flag-icon flag-icon-${countryCode} language-flag-span`}/>
                <div
                className="language-option-div">
                    {countryName} ({key})
                </div>
            </div>   
        )
    })
}

const Language = (props) => {
    const context = React.useContext(ThemeContext);
    const {navBarShown, setNavBarShown} = props;
    const {t} = useTranslation();

    const handleLanguageIconClick = () => {
        setNavBarShown((prevState) => {
            return !prevState;
        })
    }
    
    return (
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}
        onClick={navBarShown ? null : handleLanguageIconClick}>
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
                </div>
                <div
                className="dropdown-content-div"
                theme={context}>
                    <DropdownOptions/>
                </div>
            </div>
        </li>
    )
}
export default Language;