/* eslint-disable */
import React from 'react'
import "../style/countries.css"
import '../index.css'
import "../style/miscellaneous.css"
import { Link } from 'react-router-dom';
import {ThemeContext} from '../Theme';
import { withTranslation } from 'react-i18next';
import Delayed from './Delayed';
import favouriteImg from "../icons/favouriteIcon.svg"

const flags = {};

function importAll(r) {
    r.keys().forEach((key) => (flags[key] = r(key)));
}

importAll(require.context("../icons/flag", false, /\.(png|jpe?g|svg)$/));

const Country = (props) => {
  const {country} = props;
  
  const {ISO2} = country;

  const [favourite, setFavourite] = React.useState(JSON.parse(localStorage.getItem("favourite")).includes(country.ISO2));
  
  const context = React.useContext(ThemeContext);

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    setFavourite( (prevState) => {
      return !prevState;
    })
    if (JSON.parse(localStorage.getItem("favourite")).includes(country.ISO2)) {
      const newFavList = JSON.parse(localStorage.getItem("favourite")).filter((e) => {
        return e !== country.ISO2;
      });
      localStorage.setItem("favourite", JSON.stringify(newFavList));
    } else {
      const newFavList = JSON.parse(localStorage.getItem("favourite"))
      newFavList.push(country.ISO2);
      localStorage.setItem("favourite", JSON.stringify(newFavList));
    }
  }
  
  return (
    <Link to={`/country/${ISO2}`} className="no-hyperlink-effect">
      <div
      className='country-div'
      id={ISO2}
      theme={context}>
        <div
        className="country-favourite-img-div no-select">
          <img
          src={favouriteImg}
          id={country.ISO2}
          className="country-favourite-img"
          height="40"
          width="40"
          theme={context}
          favourite={favourite.toString()}
          onClick={handleFavouriteClick}
          draggable={false}/>
        </div>
        <div
        className="country-content-div">
          <div
          className="country-flag-div no-select">
            <CountryFlag
            country={country}/>
          </div>
          <div
          className="country-title-div">  
            <CountryName
            country={country}/>
          </div>
        </div>
      </div>
    </Link>
  )
}
  
const CountryFlag = (props) => {
  const {country} = props
  const {name, ISO2} = country;

  const flagDir = "./" + ISO2.toLowerCase() + ".svg";
  var flag = null;
  if (flags[flagDir] !== undefined) {
    flag = flags[flagDir].default;
  }
   
  return (
    <img
    className="country-flag-img"
    src={flag}
    alt={name}
    draggable={false}/>
  )
}

const CountryName = (props) => {
  const {name} = props.country;
  return (
    <h2
    className="country-title-h2">
      {name}
    </h2>
  )
}


const  JSXCountries = (countries) => {
  return (countries.map((country, index) => {
      return (
        <Delayed
        waitBeforeShow={10 * index}>
          <Country
          key={country.ISO2}
          country={country}/>
        </Delayed>
      );
  })
  )
}
class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {countries: this.props.t("countries:memberOfUNCountries", {returnObjects: true})};
  }

  componentWillReceiveProps(prevProps, prevState) {

    let countries = this.props.t("countries:memberOfUNCountries", {returnObjects: true});
    let tempCountries = [];

    //Searching
    countries.forEach((country) => {
        if (country.name.toLowerCase().includes(prevProps.searchValue.toLowerCase()) || prevProps.searchValue === '') {
            tempCountries.push(country);
        }
    })

    //Filtering
    
    Object.keys(prevProps.filterType).forEach((key) => {
      
      tempCountries = tempCountries.map((country) => {
          if (Array.isArray(country[prevProps.filterType[key]]))
          {
            for (let i = 0; i < country[prevProps.filterType[key]].length; i++) {
              if (country[prevProps.filterType[key]][i] === prevProps.filterValue[key]) {
                return country;
              };
            };
          } else if (country[prevProps.filterType[key]] === prevProps.filterValue[key]) {
            return country;
          } 
          
          return null;
      });

      tempCountries = tempCountries.filter((country) => country !== null);
    });

    //Favourite Filtering

    const favouriteCountries = JSON.parse(localStorage.getItem("favourite"));
    if (prevProps.favouriteFilter) {
      tempCountries = tempCountries.filter((country) => favouriteCountries.includes(country.ISO2));
    }


    //Sorting
    let ascendingDict = {
      "alphabetical": (countryA, countryB) => countryA.name.localeCompare(countryB.name),
      "ISO3": (countryA, countryB) => countryA.ISO3.localeCompare(countryB.ISO3),
      "ISO2": (countryA, countryB) => countryA.ISO2.localeCompare(countryB.ISO2),
      "continent": (countryA, countryB) => countryA.continent.localeCompare(countryB.continent),
      "noOfLanguages": (countryA, countryB) => countryA.language.length - countryB.language.length,
      "capital": (countryA, countryB) => countryA.capital.localeCompare(countryB.capital),
      "currency": (countryA, countryB) => countryA.currency.localeCompare(countryB.currency),
      "noOfLetters": (countryA, countryB) => countryA.name.length - countryB.name.length,
      "population": (countryA, countryB) => countryA.population - countryB.population,
      "area": (countryA, countryB) => countryA.area - countryB.area
    }   

    let descendingDict = {
      "alphabetical": (countryA, countryB) => countryB.name.localeCompare(countryA.name),
      "ISO3": (countryA, countryB) => countryB.ISO3.localeCompare(countryA.ISO3),
      "ISO2": (countryA, countryB) => countryB.ISO2.localeCompare(countryA.ISO2),
      "continent": (countryA, countryB) => countryB.continent.localeCompare(countryA.continent),
      "noOfLanguages": (countryA, countryB) => countryB.language.length - countryA.language.length,
      "capital": (countryA, countryB) => countryB.capital.localeCompare(countryA.capital),
      "currency": (countryA, countryB) => countryB.currency.localeCompare(countryA.currency),
      "noOfLetters": (countryA, countryB) => countryB.name.length - countryA.name.length,
      "population": (countryA, countryB) => countryB.population - countryA.population,
      "area": (countryA, countryB) => countryB.area - countryA.area
    }  

    let sortDict = {};

    prevProps.sortValue.forEach((option) => {
      sortDict[option.id] = option.ascending ? ascendingDict[option.id] : descendingDict[option.id];
    })

    tempCountries.sort((countryA, countryB) => {
      return sortDict[prevProps.sortValue[0].id](countryA, countryB) || sortDict[prevProps.sortValue[1].id](countryA, countryB) || sortDict[prevProps.sortValue[2].id](countryA, countryB) || sortDict[prevProps.sortValue[3].id](countryA, countryB) || sortDict[prevProps.sortValue[4].id](countryA, countryB) || sortDict[prevProps.sortValue[5].id](countryA, countryB) || sortDict[prevProps.sortValue[6].id](countryA, countryB) || sortDict[prevProps.sortValue[7].id](countryA, countryB) || sortDict[prevProps.sortValue[8].id](countryA, countryB) || sortDict[prevProps.sortValue[9].id](countryA, countryB)
    });


    if (JSON.stringify(prevState.countries) !== JSON.stringify(tempCountries)) {
        this.setState((prevState) => {
            return {...prevState, countries: tempCountries}
        });
        return true;
    }

    return false;
}

  render() {
    console.log("rendering Countries");

    return (
        <React.Fragment>
          {JSXCountries(this.state.countries)}
        </React.Fragment>
  )}
}

export default withTranslation()(Countries);