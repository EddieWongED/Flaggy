/* eslint-disable */
import "../../style/tab.css"
import "../../style/filter.css"
import "../../index.css"
import "../../style/miscellaneous.css"
import plusImg from "../../icons/plus.svg"
import crossImg from "../../icons/cross.svg"
import React from 'react'
import { useTranslation } from 'react-i18next'
import {ThemeContext} from '../../Theme';

const FilterTypeOptions = (props) => {
    const {handleFilterTypeChange, filterType, typeContent, index} = props;
    const context = React.useContext(ThemeContext);

    function handleTypeOptionClick(e) {
        e.stopPropagation();
        let tempFilterType = Object.assign({}, filterType);
        tempFilterType[index] = e.target.id;
        handleFilterTypeChange(tempFilterType);
        typeContent.current.style.display = "none"; 
    }

    const {t} = useTranslation();
    let typeOptions = ["continent", "language", "currency"];

    return (
        <React.Fragment>
            {typeOptions.map((option) => {
                return (
                    <button
                    id={option}
                    className="filter-type-dropdown-option-btn"
                    onClick={handleTypeOptionClick}
                    theme={context}>
                        {t(option)}
                    </button>
                )
            })}
        </React.Fragment>
    )
}

const FilterValueOptions = (props) => {
    const {handleFilterValueChange, filterType, filterValue, valueContent, index} = props;
    const context = React.useContext(ThemeContext);

    React.useEffect(() => {
        let valueOptions = [];
        t("countries:memberOfUNCountries", {returnObjects: true}).forEach((country) => {
            let countryTypeValue = country[filterType[index]];
            if (Array.isArray(countryTypeValue)) {
                countryTypeValue.forEach((typeValue) => {
                    if (!valueOptions.includes(typeValue) && typeValue !== "") {
                        valueOptions.push(typeValue);
                    }
                });
            } else if (!valueOptions.includes(countryTypeValue) && countryTypeValue !== "") {
                valueOptions.push(country[filterType[index]]);
            }
        });
        valueOptions = valueOptions.sort((a, b) => a.localeCompare(b));
        
        let tempFilterValue = Object.assign({}, filterValue);
        tempFilterValue[index] = valueOptions[0];
        handleFilterValueChange(tempFilterValue);

    }, [filterType]);

    function handleValueOptionClick(e) {
        e.stopPropagation();

        let tempFilterValue = Object.assign({}, filterValue);
        tempFilterValue[index] = e.target.id;
        handleFilterValueChange(tempFilterValue);
        
        valueContent.current.style.display = "none"; 
    }

    const {t} = useTranslation();

    let valueOptions = [];
    t("countries:memberOfUNCountries", {returnObjects: true}).forEach((country) => {
        let countryTypeValue = country[filterType[index]];
        if (Array.isArray(countryTypeValue)) {
            countryTypeValue.forEach((typeValue) => {
                if (!valueOptions.includes(typeValue) && typeValue !== "") {
                    valueOptions.push(typeValue);
                }
            });
        } else if (!valueOptions.includes(countryTypeValue) && countryTypeValue !== "") {
            valueOptions.push(country[filterType[index]]);
        }
    });
    valueOptions = valueOptions.sort((a, b) => a.localeCompare(b));

    console.log(valueOptions);
    
    return (
        <React.Fragment>
            {valueOptions
                    .map((option) => {
                return (
                    <button 
                    key={option}
                    id={option}
                    className="filter-value-dropdown-option-btn" onClick={handleValueOptionClick} theme={context}>
                        {t(option)}
                    </button>
                )
            })}
        </React.Fragment>
    )
}

const FilterOptions = (props) => {
    const {handleFilterTypeChange, handleFilterValueChange, filterType, filterValue, index} = props;
    const context = React.useContext(ThemeContext);
    const {t} = useTranslation();

    const typeContent = React.useRef(null);
    const valueContent = React.useRef(null);

    function handleTypeClick(e) {
        e.preventDefault();
        typeContent.current.style.display = "block";
    }

    function handleValueClick(e) {
        e.preventDefault();
        valueContent.current.style.display = "block";
    }

    function handleTypeOptionMouseLeave(e) {
        e.preventDefault();
        typeContent.current.style.display = "none"; 
    }

    function handleValueOptionMouseLeave(e) {
        e.preventDefault();
        valueContent.current.style.display = "none"; 
    }

    function handleCancelOptionClick(e) {
        e.preventDefault();
        let tempFilterType = Object.assign({}, filterType);
        delete tempFilterType[e.target.id];
        handleFilterTypeChange(tempFilterType);

        let tempFilterValue = Object.assign({}, filterValue);
        delete tempFilterValue[e.target.id];
        handleFilterValueChange(tempFilterValue);
    }

    return (
        <div
        className="filter-option-div card no-select"
        theme={context}>
            <div
            className="filter-type-dropdown-div"
            theme={context}
            onClick={handleTypeClick}>
                <div
                className="filter-type-text-div">
                    {filterType[index] === "" ? t("type") : t(filterType[index])}
                </div>
                <div
                ref={typeContent}
                className="filter-type-dropdown-content-div" 
                onMouseLeave={handleTypeOptionMouseLeave}
                theme={context}>
                    <FilterTypeOptions 
                    typeContent={typeContent} 
                    filterType={filterType} 
                    handleFilterTypeChange={handleFilterTypeChange} 
                    index={index}/>
                </div>
            </div>
            <div
            className="filter-value-dropdown-div"
            theme={context}
            onClick={handleValueClick}>
                <div
                className="filter-value-text-div">
                    {filterValue[index] === "" ? t("filterValue") : t(filterValue[index])}
                </div>
                <div
                ref={valueContent}
                className="filter-value-dropdown-content-div"
                onMouseLeave={handleValueOptionMouseLeave}
                theme={context}>
                    <FilterValueOptions 
                    valueContent={valueContent} 
                    filterType={filterType} 
                    handleFilterValueChange={handleFilterValueChange}
                    filterValue={filterValue}
                    index={index}/>
                </div>
            </div>
            <div
            id={index}
            className="filter-option-cross-img-div"
            onClick={handleCancelOptionClick}>
                <img
                id={index}
                className="filter-option-cross-img"
                src={crossImg}
                height="18"
                width="18"/>
            </div>
        </div>
    )
}
const Filter = (props) => {
    const {handleFilterTypeChange, handleFilterValueChange, filterType, filterValue, tabOpened} = props;
    const context = React.useContext(ThemeContext);
    console.log("Rendering Filter");

    const [noOfFilter, setNoOfFilter] = React.useState(0);
        
    function handleAddFilter() {

        let tempFilterType = Object.assign({}, filterType);
        
        tempFilterType[noOfFilter] = "continent";

        handleFilterTypeChange(tempFilterType);

        let tempFilterValue = Object.assign({}, filterValue);

        tempFilterValue[noOfFilter] = "Africa";

        handleFilterValueChange(tempFilterValue);

        setNoOfFilter((prevState) => prevState + 1);
    }
    
    return (
        <div 
        id="filter-div"  
        className="filter-div" 
        tabOpened={tabOpened}>
            {Object.keys(filterType).map((key) => {
                return (
                    <FilterOptions 
                    key={key} 
                    filterType={filterType} 
                    handleFilterTypeChange={handleFilterTypeChange} 
                    handleFilterValueChange={handleFilterValueChange} 
                    filterValue={filterValue}
                    index={key}/>
                )
            })}
            <div
            className="filter-add-img-div card"
            theme={context}>
                <img
                alt="plus"
                src={plusImg}
                height=""
                width="24" 
                className="filter-add-img"
                onClick={handleAddFilter}/>
            </div>
        </div>
    )
}

export default Filter;