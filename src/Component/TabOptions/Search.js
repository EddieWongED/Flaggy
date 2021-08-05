/* eslint-disable */
import "../../style/tab.css"
import "../../index.css"
import "../../style/miscellaneous.css"
import React from 'react'
import {ThemeContext} from '../../Theme';
import { useTranslation } from 'react-i18next'

const Search = (props) => {
    const searchInput = React.useRef(null);
    const context = React.useContext(ThemeContext);
    const {t} = useTranslation();

    return (
        <div
        id="search-div"
        ref={props.searchDiv}
        className="search-div"
        tabOpened={props.tabOpened}>
            <input
            autoFocus="searchInput === document.activeElement"
            ref={searchInput}
            key="search-input"
            id="search"
            className="search-input card"
            type="text"
            value={props.searchValue}
            theme={context}
            onChange={props.handleSearchChange}
            placeholder={`${t("search")}...`}/>
        </div>
    )
}

export default Search;