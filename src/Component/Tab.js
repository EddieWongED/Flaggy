/* eslint-disable */
import "../style/tab.css"
import "../style/sort.css"
import "../style/filter.css"
import "../index.css"
import "../style/miscellaneous.css"
import React from 'react'
import filterImg from "../icons/filterIcon.svg"
import sortImg from "../icons/sortIcon.svg"
import searchImg from "../icons/searchIcon.svg"
import favouriteImg from "../icons/favouriteIcon.svg"
import {ThemeContext} from '../Theme';
import { withTranslation } from 'react-i18next'
import Sort from "./TabOptions/Sort.js"
import Filter from "./TabOptions/Filter.js"
import Search from "./TabOptions/Search.js"
import Favourite from "./TabOptions/Favourite.js"

class TabOptions extends React.Component {
    
    static contextType = ThemeContext;
    
    constructor(props) {
        super(props);
        this.state = {display: {
            "sort": this.props.t("sort"),
            "filter": this.props.t("filter"),
            "search": this.props.t("search"),
            "favourite": this.props.t("favourite"),
        }};
    }

    shouldComponentUpdate(prevProps, prevState) {
      
        let tempDisplay = {
            "sort": this.props.t("sort"),
            "filter": this.props.t("filter"),
            "search": this.props.t("search"),
            "favourite": this.props.t("favourite"),
        };

        if (JSON.stringify(prevState.display) !== JSON.stringify(tempDisplay)) {
            this.setState((prevState) => { 
                return {...prevState, 
                display: tempDisplay}
            })
            return true;
        }

        return prevProps.tabOpened !== this.props.tabOpened;
    }

    render() {
        console.log("rendering TabOptions");
    
        const {t} = this.props;
        const options = ["sort", "filter", "search", "favourite"];
        const optionImgs = {"sort": sortImg, "filter": filterImg, "search": searchImg, "favourite": favouriteImg};
        return (
        <div className="tab-div no-select" >
            <ul className="tab-content-table">
                {options.map((option) => (
                    <li key={option} id={option} className={`tab-content-item ${option}-li`} onClick={this.props.handleTabChange} tabOpened={this.props.tabOpened} theme={this.context}>
                                <img src={optionImgs[option]} className={`tab-${option}-img`} alt={`tab-${option}-img`}/>
                                <div className="tab-content-item-word">
                                    {t(option)}
                                </div>
                    </li>
                ))}
            </ul>
        </div>
        )
    }
}

let TabOption = withTranslation()(TabOptions);

const Tab = (props) => {
    const {handleSearchChange, searchValue, handleSortChange, sortValue, handleFilterTypeChange, filterType, handleFilterValueChange, filterValue} = props;
    const [tabOpened, setTabOpened] = React.useState();
    const context = React.useContext(ThemeContext);
    
    function handleTabChange(e) {
        e.preventDefault();
        setTabOpened(e.currentTarget.id);
    }

    return (
        <React.Fragment>
            <TabOption 
            handleTabChange={handleTabChange} 
            tabOpened={tabOpened}/>
            <div 
            className="horizontal-line"
            theme={context}/>
            <div 
            className="tab-content-div">
                        <Sort
                        tabOpened={tabOpened}
                        handleSortChange={handleSortChange}
                        sortValue={sortValue}
                        />
                        <Filter
                        tabOpened={tabOpened}
                        handleFilterTypeChange={handleFilterTypeChange}
                        filterType={filterType}
                        handleFilterValueChange={handleFilterValueChange}
                        filterValue={filterValue}/>
                        <Search
                        tabOpened={tabOpened}
                        handleSearchChange={handleSearchChange}
                        searchValue={searchValue}/>
                        <Favourite
                        tabOpened={tabOpened}/>
            </div>
            <div
            className="horizontal-line"
            theme={context}/>
        </React.Fragment>
    )
}

export default Tab;