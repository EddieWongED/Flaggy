import React from 'react';
import {ThemeContext} from '../Theme';
import loadable from '@loadable/component'

class CountriesSection extends React.Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.handleLangClick = this.handleLangClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.toggleSearchIconHover = this.toggleSearchIconHover.bind(this);
        this.toggleSearchBarHover = this.toggleSearchBarHover.bind(this);
        this.toggleSearchFocus = this.toggleSearchFocus.bind(this);
        this.searchBar = React.createRef(null);
        this.state = {lang: localStorage.getItem("displayLang"), searchValue: '', searchClickState: false, hoverSearchIcon: false, hoverSearchBar: false, searchOnFocus: false};  
    }

    handleLangClick() {
        this.setState(prevState => {
            if (prevState.lang === "English") {
                localStorage.setItem("displayLang", "Chinese");
                return {...prevState, lang: "Chinese"};
            } else {
                localStorage.setItem("displayLang", "English");
                return {...prevState, lang: "English"};
            }
        });
    }

    handleSearchClick() {
        this.setState(prevState => {
            if (prevState.searchClickState) {
                if (this.searchBar.current.value === '') {
                    this.searchBar.current.style.width = "0%";
                    this.searchBar.current.style.visibility = "hidden";
                }
            } else {
                this.searchBar.current.style.width = "60%";
                this.searchBar.current.style.visibility = "visible";
            }
            return {...prevState, searchClickState: !prevState.searchClickState}
        });
    }

    toggleSearchIconHover() {
        this.setState(prevState => {
            if (prevState.hoverSearchIcon && !this.state.searchClickState && !this.state.searchOnFocus) {
                if (this.searchBar.current.value === '') {
                    this.searchBar.current.style.width = "0%";
                    this.searchBar.current.style.visibility = "hidden";
                }
            } else if (!prevState.hoverSearchIcon) {
                this.searchBar.current.style.width = "60%";
                this.searchBar.current.style.visibility = "visible";
            }
            return {hoverSearchIcon: !prevState.hoverSearchIcon};
        });
    }

    toggleSearchBarHover() {
        this.setState(prevState => {
            if (prevState.hoverSearchBar && !this.state.searchOnFocus && !this.state.searchClickState) {
                if (this.searchBar.current.value === '') {
                    this.searchBar.current.style.width = "0%";
                    this.searchBar.current.style.visibility = "hidden";
                }
            } else {
                this.searchBar.current.style.width = "60%";
                this.searchBar.current.style.visibility = "visible";
            }
            return {hoverSearchBar: !prevState.hoverSearchBar};
        });
    }

    toggleSearchFocus(e) {
        this.setState(prevState => {
            if (prevState.searchOnFocus && !this.state.searchClickState) {
                if (this.searchBar.current.value === '') {
                    e.target.style.width = "0%";
                    e.target.style.visibility = "hidden";
                }
            } else if (!prevState.searchOnFocus) {
                e.target.style.width = "60%";
                e.target.style.visibility = "visible";
            };
            return {searchOnFocus: !prevState.searchOnFocus};
        });
        
    }

    handleSearchChange(e) {
        this.setState((prevState) => {
            return {...prevState, searchValue: e.target.value}
        });
    }

    render() {
    const Countries = loadable(() => import('./Countries.js'));
    return (
        <React.Fragment> 
            <div className="search-div">
                <div className="search-img-div" onClick={this.handleSearchClick} onMouseEnter={this.toggleSearchIconHover} onMouseLeave={this.toggleSearchIconHover}>
                    <img src="https://img.icons8.com/color/48/4a90e2/search--v2.png" alt="search:" className="search-img"/>
                </div>
                <input ref={this.searchBar} id="search" type="text" value={this.state.searchValue} theme={this.context} onChange={this.handleSearchChange} className="search-input" onMouseEnter={this.toggleSearchBarHover} onMouseLeave={this.toggleSearchBarHover} onFocus={this.toggleSearchFocus} onBlur={this.toggleSearchFocus} placeholder="Search..."/>
            </div>
            <div className="lang-btn-div">
                <button type='button' className='lang-btn' onClick={this.handleLangClick} theme={this.context}>
                {this.state.lang}
                </button>
            </div>
            <div className='countries-list-div'>
                <Countries countries={this.props.countries} search={this.state.searchValue} lang={this.state.lang}/>
            </div>
        </React.Fragment>
    );
    }
}

export default CountriesSection;
