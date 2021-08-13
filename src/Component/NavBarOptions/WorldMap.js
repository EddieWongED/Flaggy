import React from 'react'
import '../../index.css'
import '../../style/navBar.css'
import '../../style/miscellaneous.css'
import { ThemeContext } from '../../Theme'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const WorldMap = (props) => {
    const context = React.useContext(ThemeContext);
    const {navBarShown} = props;
    const {t} = useTranslation();

    return (
        <Link to="/map" className="no-hyperlink-effect">
            <li
            className="nav-option-li"
            theme={context}
            navBarShown={navBarShown.toString()}>
                <div
                className="nav-option-div">
                    <div
                    className="nav-option-img-div">
                        <img
                        className="map-img"
                        theme={context}
                        alt="map-img"/>
                    </div>
                    <span
                    className="nav-option-name"
                    navBarShown={navBarShown.toString()}>
                        {t("map")}
                    </span>
                </div>
            </li>
        </Link>
    )
}

export default WorldMap;