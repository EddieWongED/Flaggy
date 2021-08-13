import React from 'react'
import '../../index.css'
import '../../style/navBar.css'
import '../../style/miscellaneous.css'
import { ThemeContext } from '../../Theme';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HomePage = (props) => {
    const context = React.useContext(ThemeContext);
    const {navBarShown} = props;
    const {t} = useTranslation();

    return (
        <li
        className="nav-option-li"
        theme={context}
        navBarShown={navBarShown.toString()}>
            <Link to="/" exact className="no-hyperlink-effect">
                <div
                className="nav-option-div">
                    <div
                    className="nav-option-img-div">
                        <img
                        className="home-img"
                        theme={context}
                        alt="home-img"/>
                    </div>
                    <span
                    className="nav-option-name"
                    navBarShown={navBarShown.toString()}>
                        {t("home")}
                    </span>
                </div>
            </Link>
        </li>
    )
}

export default HomePage;
