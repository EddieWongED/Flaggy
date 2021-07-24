
import "../style/tab.css"
import "../style/sort.css"
import "../index.css"
import "../style/miscellaneous.css"
import React from 'react'
import filterImg from "../icons/filterIcon.svg"
import sortImg from "../icons/sortIcon.svg"
import searchImg from "../icons/searchIcon.svg"
import favouriteImg from "../icons/favouriteIcon.svg"
import {ThemeContext} from '../Theme';
import { withTranslation, useTranslation } from 'react-i18next'

const SortOptions = (props) => {
    const context = React.useContext(ThemeContext);
    const {t} = useTranslation();
    const {optionID, handleDrag, handleDrop} = props;

    return (
        <div id={optionID} theme={context} className="sort-option-div" draggable={true} onDragOver={(ev) => ev.preventDefault()} onDragStart={handleDrag} onDrop={handleDrop}>
            <div className="sort-option-img-div">
                <img theme={context} className="sort-option-img" draggable={false} width="26" height="26" alt="drag"/>
            </div>
            <div id={optionID} className="sort-content-div">
                {t(props.optionID)}
            </div>
        </div>
    );
}

const Sort = (props) => {
    // const context = React.useContext(ThemeContext);
    // const {t} = useTranslation();
    const [dragId, setDragId] = React.useState();

    function handleDrag(ev) {
        setDragId(ev.currentTarget.id);
    }

    function handleDrop(ev) {
        const dragBox = props.sortValue.find((option) => option.id === dragId);
        const dropBox = props.sortValue.find((option) => option.id === ev.currentTarget.id);
    
        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;
    
        const newOptionState = props.sortValue.map((option) => {
          if (option.id === dragId) {
            option.order = dropBoxOrder;
          }
          if (option.id === ev.currentTarget.id) {
            option.order = dragBoxOrder;
          }
          return option;
        });
    
        props.handleSortChange(newOptionState);
    }

    return (
        <div id="sort-div" ref={props.sortDiv} className="sort-div" tabOpened={props.tabOpened}>
            {props.sortValue
                    .sort((a, b) => a.order - b.order)
                    .map((sortOption, index) => {
                        return (
                        <div className="sort-option-numbering-div">
                            <div className="sort-numbering">
                                {`${index + 1}.`}
                            </div>
                            <SortOptions key={sortOption.id} optionID={sortOption.id} handleDrag={handleDrag} handleDrop={handleDrop}/>
                        </div>
                    );})}
        </div>
    )
}

const Filter = (props) => {
    // const context = React.useContext(ThemeContext);
    // const {t} = useTranslation();

    return (
        <div id="filter-div" ref={props.filterDiv} className="filter-div" tabOpened={props.tabOpened}>
            
        </div>
    )
}

const Search = (props) => {
    const searchInput = React.useRef(null);
    const context = React.useContext(ThemeContext);
    const {t} = useTranslation();

    return (
        <div id="search-div" ref={props.searchDiv} className="search-div" tabOpened={props.tabOpened}>
            <input autoFocus="searchInput === document.activeElement" ref={searchInput} key="search-input" id="search" className="search-input" type="text" value={props.searchValue} theme={context} onChange={props.handleSearchChange}  placeholder={`${t("search")}...`}/>
        </div>
    )
}

const Favourite = (props) => {
    // const context = React.useContext(ThemeContext);
    // const {t} = useTranslation();
    console.log("rendering TabContent");
    

    return (
        <div id="favourite-div" tabOpened={props.tabOpened} ref={props.favouriteDiv} className="favourite-div">
            
        </div>
    )
}

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
        <div className="tab-div" >
            <ul className="tab-content-table">
                {options.map((option) => (
                    <li id={option} className={`tab-content-item ${option}-li`} onClick={this.props.handleTabChange} tabOpened={this.props.tabOpened} theme={this.context}>
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

    const [tabOpened, setTabOpened] = React.useState();
    const context = React.useContext(ThemeContext);

    function handleTabChange(e) {
        e.preventDefault();
        let str = e.currentTarget.id;
        setTabOpened(e.currentTarget.id);
    }

    return (
        <React.Fragment>
            <TabOption handleTabChange={handleTabChange} tabOpened={tabOpened}/>
            <div className="horizontal-line" theme={context}/>
            <div className="tab-content-div">
                        <Sort handleSortChange={props.handleSortChange} sortValue={props.sortValue} tabOpened={tabOpened}/>
                        <Filter tabOpened={tabOpened}/>
                        <Search handleSearchChange={props.handleSearchChange} searchValue={props.searchValue} tabOpened={tabOpened}/>
                        <Favourite tabOpened={tabOpened}/>
            </div>
            <div className="horizontal-line" theme={context}/>
        </React.Fragment>
    )
}

export default Tab;