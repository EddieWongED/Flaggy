import React from 'react';
import {ThemeContext} from '../Theme';
import loadable from '@loadable/component'
import { withTranslation } from 'react-i18next'
import Countries from './Countries.js';
import Tab from './Tab.js';
class CountriesSection extends React.Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.state = {searchValue: '', sortValue: [
            {
                id: "alphabetical",
                order: 1
            },
            {
                id: "code",
                order: 2
            },
            {
                id: "continent",
                order: 3
            },
            {
                id: "noOfLanguages",
                order: 4
            },
            {
                id: "capital",
                order: 5
            },
            {
                id: "currency",
                order: 6
            },
            {
                id: "noOfLetters",
                order: 7
            },   
        ]};  
    }

    handleSortChange(newSortValue) {
        this.setState((prevState) => {
            return {...prevState, sortValue: newSortValue};
        });
    }

    handleSearchChange(e) {
        this.setState((prevState) => {
            return {...prevState, searchValue: e.target.value};
        });
    }

    render() {
    console.log("rendering CountriesSection");

    return (
        <React.Fragment> 
            <Tab handleSearchChange={this.handleSearchChange} searchValue={this.state.searchValue} handleSortChange={this.handleSortChange} sortValue={this.state.sortValue}/>
            <div className='countries-list-div'>
                <Countries searchValue={this.state.searchValue} sortValue={this.state.sortValue}/>
            </div>
        </React.Fragment>
    );
    }
}

export default withTranslation()(CountriesSection);
