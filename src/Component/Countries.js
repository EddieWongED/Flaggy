/* eslint-disable */
import React, { Suspense } from 'react'
import "../style/countries.css"
import '../index.css'
import "../style/miscellaneous.css"
import {ThemeContext} from '../Theme';
import { useTranslation, withTranslation } from 'react-i18next';
import Delayed from './Delayed';
import Map from "./Map"
import favouriteImg from "../icons/favouriteIcon.svg"
import crossImg from "../icons/cross.svg"
import "../style/miscellaneous.css"

const flags = {};

function importAll(r) {
    r.keys().forEach((key) => (flags[key] = r(key)));
}

importAll(require.context("../icons/flag", false, /\.(png|jpe?g|svg)$/));

const PreviewCountry = (props) => {

  const context = React.useContext(ThemeContext);
  const {country, enlarged, favourite, handleFavouriteClick} = props;

  return (
    <div
    className="country-preview-div"
    enlarged={(enlarged === country.ISO2).toString()}>
      <div
      className="country-preview-favourite-img-div no-select"
      enlarged={(enlarged === country.ISO2).toString()}>
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
      className="country-preview-content-div"
      enlarged={(enlarged === country.ISO2).toString()}>
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
  )
}

const EnlargedCountry = (props) => {

  const context = React.useContext(ThemeContext);
  const {country, enlarged, handleEnlargedChange, favourite, handleFavouriteClick} = props;
  const {name} = country;

  function handleCountryCancelClick(e) {
      e.stopPropagation();
      handleEnlargedChange(null);
  } 
  return (
  <div
  className="country-enlarged-div"
  enlarged={(enlarged === country.ISO2).toString()}>
    <div
    className="country-enlarged-top-bar-div">
      <div
      className="country-enlarged-country-name">
        {name}
      </div>
      <div
      className="country-enlarged-favourite-img-div no-select"
      enlarged={(enlarged === country.ISO2).toString()}>
        <img
        src={favouriteImg}
        id={country.ISO2}
        className="country-favourite-img"
        height="40"
        width="40"
        theme={context}
        favourite={favourite.toString()}
        onClick={handleFavouriteClick}/>
      </div>
      <div
      className="country-cross-img-div no-select"
      onClick={handleCountryCancelClick}>
              <img
              className="country-cross-img"
              src={crossImg}
              height="24"
              width="24"/>
      </div>
    </div>
    <div
    className="country-enlarged-content-div"
    enlarged={(enlarged === country.ISO2).toString()}>
        <div
        className="country-enlarged-content-left-div">
          <div
          className="country-enlarged-flag-div no-select">
            <CountryEnlargedFlag
            country={country}/>
          </div>
          <div
          className="content-table-div">
            <CountryMetadata
            country={country}/>
          </div>
        </div>
        <div
        className="country-enlarged-map-div">
            <Delayed
            waitBeforeShow={500} animation={true}>
              <Map country={country}/>
            </Delayed>
        </div>
    </div>
  </div>
  );
}
const Country = (props) => {
  
  const {country, enlarged, handleEnlargedChange} = props;
  
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
  
  const handleCountryClick = (e) => {
    e.preventDefault();
    handleEnlargedChange(country.ISO2);
  }

  return (
    <React.Fragment>
      <div
      className='country-div'
      id={country.ISO2}
      theme={context}
      onClick={handleCountryClick}
      enlarged={(enlarged === country.ISO2).toString()}>
        <PreviewCountry
        country={country}
        enlarged={enlarged}
        favourite={favourite}
        handleFavouriteClick={handleFavouriteClick}/>
        <EnlargedCountry
        country={country}
        enlarged={enlarged}
        handleEnlargedChange={handleEnlargedChange}
        favourite={favourite}
        handleFavouriteClick={handleFavouriteClick}/>
      </div>
    </React.Fragment>
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

const CountryEnlargedFlag = (props) => {
  const {country} = props
  const {name, ISO2} = country;

  const flagDir = "./" + ISO2.toLowerCase() + ".svg";
  var flag = null;
  if (flags[flagDir] !== undefined) {
    flag = flags[flagDir].default;
  }
   
  return (
    <img
    className="country-enlarged-flag-img"
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

const CountryMetadata = (props) => {
  const {ISO2, ISO3, continent, language, capital, currency, population, area} = props.country;
  const context = React.useContext(ThemeContext);
  const {t} = useTranslation()

  return (
    <table
    className="content-table"
    theme={context}>
      <thead>
          <tr>
              <th
              className="no-select">
                {t("metadata")}
              </th>
              <th
              className="no-select">
                {t("value")}
              </th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td
              className="no-select">
                {t("ISO2")}
              </td>
              <td>
                {ISO2}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("ISO3")}
              </td>
              <td>
                {ISO3}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("continent")}
              </td>
              <td>
                {continent}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("language")}
              </td>
              <td>
                {language.join(", ")}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("capital")}
              </td>
              <td>
                {capital}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("currency")}
              </td>
              <td>
                {currency}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("population")}
              </td>
              <td>
                {population.toLocaleString()}
              </td>
          </tr>
          <tr>
              <td
              className="no-select">
                {t("area")} (km²)
              </td>
              <td>
                {area.toLocaleString()}
              </td>
          </tr>
      </tbody>
    </table>
  )
}

const  JSXCountries = (countries, endlarged, handleEnlargedChange) => {
  return (countries.map((country, index) => {
      return (
        <Delayed
        waitBeforeShow={10 * index}>
          <Country
          key={country.ISO2}
          country={country}
          handleEnlargedChange={handleEnlargedChange}
          enlarged={endlarged}/>
        </Delayed>
      );
  })
  )
}
class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnlargedChange = this.handleEnlargedChange.bind(this);
    this.state = {enlarged: null, countries: this.props.t("countries:memberOfUNCountries", {returnObjects: true})};
  }

  handleEnlargedChange(ISO2) {
    this.setState((prevState) => {
      return {...prevState, enlarged: ISO2};
    })
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
    console.log("enlarged=", this.state.enlarged);
    
    return (
        <React.Fragment>
          {JSXCountries(this.state.enlarged !== null ? this.props.t("countries:memberOfUNCountries", {returnObjects: true}).filter((country) => country.ISO2 === this.state.enlarged) : this.state.countries, this.state.enlarged, this.handleEnlargedChange)}
        </React.Fragment>
  )}

}


export default withTranslation()(Countries);