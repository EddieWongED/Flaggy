/* eslint-disable */
import React from 'react';
import "../style/countries.css"
import {ThemeContext} from '../Theme';
import { withTranslation } from 'react-i18next'
import Countries from './Countries.js';
import Tab from './Tab.js';
class CountriesSection extends React.Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleFavouriteFilterChange = this.handleFavouriteFilterChange.bind(this);
        this.state = {favouriteFilter: false, filterType: {}, filterValue: {}, searchValue: '', sortValue: [
            {
                id: "alphabetical",
                ascending: true,
                order: 1
            },
            {
                id: "ISO3",
                ascending: true,
                order: 2
            },
            {
                id: "ISO2",
                ascending: true,
                order: 3
            },
            {
                id: "continent",
                ascending: true,
                order: 4
            },
            {
                id: "noOfLanguages",
                ascending: true,
                order: 5
            },
            {
                id: "capital",
                ascending: true,
                order: 6
            },
            {
                id: "currency",
                ascending: true,
                order: 7
            },
            {
                id: "noOfLetters",
                ascending: true,
                order: 8
            },
            {
                id: "population",
                ascending: true,
                order: 9
            },
            {
                id: "area",
                ascending: true,
                order: 10
            },     
        ]
    };  
    }

    handleFavouriteFilterChange(newFavouriteFilter) {
        this.setState((prevState) => {
            return {...prevState, favouriteFilter: newFavouriteFilter};
        });
    }

    handleFilterTypeChange(newFilterType) {
        this.setState((prevState) => {
            return {...prevState, filterType: newFilterType};
        });
    }

    handleFilterValueChange(newFilterValue) {      
        this.setState((prevState) => {
            return {...prevState, filterValue: newFilterValue};
        });
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

    handleSearchValueChange(newSearchValue) {
        console.log("hi");
        
        this.setState((prevState) => {
            return {...prevState, searchValue: newSearchValue};
        });
    }

    render() {
    console.log("rendering CountriesSection");
    
    return (
        <React.Fragment> 
            <Tab 
            handleSearchChange={this.handleSearchChange}
            handleSearchValueChange={this.handleSearchValueChange} 
            searchValue={this.state.searchValue} 
            handleSortChange={this.handleSortChange} 
            sortValue={this.state.sortValue} 
            handleFilterTypeChange={this.handleFilterTypeChange} 
            filterType={this.state.filterType}
            handleFilterValueChange={this.handleFilterValueChange}
            filterValue={this.state.filterValue}
            handleFavouriteFilterChange={this.handleFavouriteFilterChange}
            favouriteFilter={this.state.favouriteFilter}/>
            <div 
            className='countries-list-div'>
                <Countries 
                searchValue={this.state.searchValue} 
                sortValue={this.state.sortValue}
                filterType={this.state.filterType}
                filterValue={this.state.filterValue}
                favouriteFilter={this.state.favouriteFilter}/>
            </div>
        </React.Fragment>
    );
    }
}

export default withTranslation()(CountriesSection);
