/* eslint-disable */
import "../../style/tab.css"
import "../../index.css"
import "../../style/search.css"
import "../../style/miscellaneous.css"
import React from 'react'
import {ThemeContext} from '../../Theme';
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom"

const flags = {};

function importAll(r) {
    r.keys().forEach((key) => (flags[key] = r(key)));
}

importAll(require.context("../../icons/flag", false, /\.(png|jpe?g|svg)$/));

const trimStr = (str) => {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@+<>?\\\|\[\]\"\' ]/g,"").toLowerCase();
}

const matchingCountries = (countries, searchValue) => {
    if (searchValue === "") {
        return [];
    }
    
    const matchingDict = {};

    countries.forEach((country) => {
        const {ISO3} = country;
        const itemsToSearch = ["ISO2", "aliases", "ISO3", "name"];
        itemsToSearch.forEach((itemToSearch) => {
            if (Array.isArray(country[itemToSearch])) {
                const values = country[itemToSearch];

                values.forEach((value) => {
                    var matchedChar = 0;
                    var wrongChar = 0;
                    if (trimStr(searchValue).length <= trimStr(value).length) {
                        for (var i = 0; i < trimStr(searchValue).length; i++) {
                            if (trimStr(searchValue)[i] === trimStr(value)[i]) {
                                matchedChar++;
                            } else {
                                wrongChar++;
                            }
                        }
                    }

                    const percentage = matchedChar / trimStr(value).length;
                    if (Object.keys(matchingDict).includes(ISO3)) {
                        if (percentage > matchingDict[ISO3]["percentage"] || 
                            percentage === matchingDict[ISO3]["percentage"] && matchedChar > matchingDict[ISO3]["matchedChar"] || 
                            percentage === matchingDict[ISO3]["percentage"] && matchedChar === matchingDict[ISO3]["matchedChar"] && wrongChar > matchingDict[ISO3]["wrongChar"]) {
                            matchingDict[ISO3] = {
                                "key": ISO3,
                                "percentage": percentage,
                                "matchedChar": matchedChar,
                                "wrongChar": wrongChar,
                                "type": itemToSearch
                            }
                        }
                    } else {
                        matchingDict[ISO3] = {
                            "key": ISO3,
                            "percentage": percentage,
                            "matchedChar": matchedChar,
                            "wrongChar": wrongChar,
                            "type": itemToSearch
                        }
                    }
                })
            } else {
                const value = country[itemToSearch];
                var matchedChar = 0;
                var wrongChar = 0;
                if (trimStr(searchValue).length <= trimStr(value).length) {
                    for (var i = 0; i < trimStr(searchValue).length; i++) {
                        if (trimStr(searchValue)[i] === trimStr(value)[i]) {
                            matchedChar++;
                        } else {
                            wrongChar++;
                        }
                    }
                }

                const percentage = matchedChar / trimStr(value).length;
                if (Object.keys(matchingDict).includes(ISO3)) {
                    if (percentage > matchingDict[ISO3]["percentage"] || 
                        percentage === matchingDict[ISO3]["percentage"] && matchedChar > matchingDict[ISO3]["matchedChar"] || 
                        percentage === matchingDict[ISO3]["percentage"] && matchedChar === matchingDict[ISO3]["matchedChar"] && wrongChar > matchingDict[ISO3]["wrongChar"]) {
                        matchingDict[ISO3] = {
                            "key": ISO3,
                            "percentage": percentage,
                            "matchedChar": matchedChar,
                            "wrongChar": wrongChar,
                            "type": itemToSearch
                        }
                    }
                } else {
                    matchingDict[ISO3] = {
                        "key": ISO3,
                        "percentage": percentage,
                        "matchedChar": matchedChar,
                        "wrongChar": wrongChar,
                        "type": itemToSearch
                    }
                }
            }
        });
    });
    const sortedCountries = countries;
    sortedCountries.sort((countryA, countryB) => {
        return matchingDict[countryB.ISO3]["percentage"] - matchingDict[countryA.ISO3]["percentage"] || 
               matchingDict[countryB.ISO3]["matchedChar"] - matchingDict[countryA.ISO3]["matchedChar"] ||
               matchingDict[countryB.ISO3]["wrongChar"] - matchingDict[countryA.ISO3]["wrongChar"];
    })

    console.log(matchingDict);
    
    return sortedCountries;
}

const SearchDropdown = (props) => {
    const {searchValue, handleSearchValueChange, setDropdownShown} = props;
    const {t} = useTranslation();
    const context = React.useContext(ThemeContext);

    const countries = t("countries:memberOfUNCountries", {returnObjects: true});
    const suggestedCountries = matchingCountries(countries, searchValue);
    
    return (
        suggestedCountries.map((country) => {
        const {name, ISO2, ISO3} = country;

        const flagDir = "./" + ISO2.toLowerCase() + ".svg";
        var flag = null;
        if (flags[flagDir] !== undefined) {
            flag = flags[flagDir].default;
        }

        const handleDropdownOptionClick = (e) => {
            e.preventDefault();
            handleSearchValueChange(name);
            setDropdownShown(false);
        }

        return (
        <div
        id={ISO2}
        key={ISO2}
        className="search-dropdown-option-div no-select"
        theme={context}
        onClick={handleDropdownOptionClick}>
            <div
            className="search-dropdown-option-flag-div">
                <img
                className="search-dropdown-option-flag-img"
                alt={name}
                src={flag}/>
            </div>
            <div
            className="search-dropdown-option-ISO3-div">
                {ISO3}
            </div>
            <div
            className="search-dropdown-option-name-div">
                {name}
            </div>
        </div>
        )
        })
    )
}

const Search = (props) => {
    const searchInput = React.useRef(null);
    const context = React.useContext(ThemeContext);
    const {tabOpened, searchValue, handleSearchChange, handleSearchValueChange} = props;
    const dropdownRef = React.useRef(null);
    const {t} = useTranslation();
    const [isSearchBarOnFocus, setIsSearchBarOnFocus] = React.useState(false);
    const [isMouseOnDropdown, setIsMouseOnDropdown] = React.useState(false);
    const [dropdownShown, setDropdownShown] = React.useState(false);
    
    const searchBarOnFocus = () => {
        setDropdownShown(true);
        setIsSearchBarOnFocus(true);
    }

    const searchBarOnBlur = () => {
        setIsSearchBarOnFocus(false);
        if (!isMouseOnDropdown) {
            setDropdownShown(false);
        }
    }

    const dropdownOnMouseEnter = () => {
        setIsMouseOnDropdown(true);
    }

    const dropdownOnMouseLeave = () => {
        setIsMouseOnDropdown(false);
        if (!isSearchBarOnFocus) {
            setDropdownShown(false);
        }
    }

    return (
        <div
        id="search-div"
        className="search-div"
        tabOpened={tabOpened}>
            <div
            className="search-bar-div">
                <input
                ref={searchInput}
                key="search-input"
                id="search"
                className="search-input card"
                type="text"
                value={searchValue}
                theme={context}
                autoComplete="off"
                onChange={handleSearchChange}
                onFocus={searchBarOnFocus}
                onBlur={searchBarOnBlur}
                placeholder={`${t("search")}...`}/>
                <div
                className="search-dropdown-content-div"
                ref={dropdownRef}
                theme={context}
                dropdownShown={dropdownShown.toString()}
                onMouseEnter={dropdownOnMouseEnter}
                onMouseLeave={dropdownOnMouseLeave}
                >
                    <SearchDropdown
                    handleSearchValueChange={handleSearchValueChange}
                    searchValue={searchValue}
                    setDropdownShown={setDropdownShown}/>
                </div>
            </div>
        </div>

    )
}

export default Search;