import React from 'react';
import loadable from '@loadable/component'

class CountriesSection extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.state = {lang: localStorage.getItem("displayLang"), searchValue: ''};  
    }

    handleClick() {
        this.props.setCountries(prevState => {
            return prevState.map(element => {
                return ({...element, display: localStorage.getItem("displayLang") === "English" ? element.chineseName : element.englishName}
                );
              }
            );
        });
        
        this.setState(prevState => {
            if (prevState.lang === "English") {
                localStorage.setItem("displayLang", "Chinese");
                return {lang: "Chinese"};
            } else {
                localStorage.setItem("displayLang", "English");
                return {lang: "English"};
            }
        });
        
        if (localStorage.getItem("displayLang") === "English") {
            localStorage.setItem("displayLang", "Chinese");
        } else {
            localStorage.setItem("displayLang", "English");
        }
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
            <div className="searching">
                <label htmlFor="search" style={{fontSize: "x-large"}}>Search: </label>
                <input id="search" type="text" value={this.state.searchValue} onChange={this.handleSearchChange} className="search"/>
            </div>
            <div className="button">
                <button type='button' className='btn' onClick={this.handleClick}>
                {this.state.lang}
                </button>
            </div>
            <div className='countries-list'>
                <Countries countries={this.props.countries} search={this.state.searchValue} lang={this.state.lang}/>
            </div>
        </React.Fragment>
    );
    }
}

export default CountriesSection;
