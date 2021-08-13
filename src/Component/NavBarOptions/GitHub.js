import React from 'react'
import '../../index.css'
import '../../style/navBar.css'
import { ThemeContext } from '../../Theme';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const GitHub = (props) => {
    const context = React.useContext(ThemeContext);
    const {navBarShown} = props;
    const {t} = useTranslation();

    return (
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
    )
}

export default GitHub;