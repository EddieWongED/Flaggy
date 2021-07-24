import React from 'react'
import '../index.css'
import "../style/miscellaneous.css"
import {ThemeContext} from '../Theme';
import { useTranslation, withTranslation } from 'react-i18next';

const Country = (props) => {
  
  const context = React.useContext(ThemeContext);

  const handleClick = (e) => {
    alert("You are clicking: " + props.country.name);
  }
  
  // returning a JSX
  return (
    <React.Fragment>
      <div className='country-div' onClick={handleClick} theme={context}>
        <div className="country-content-div">
          <div className="country-flag-div no-select">
            <CountryFlag country={props.country}/>
          </div>
          <div className="country-title-div">  
            <CountryName country={props.country}/>
          </div>
          <div className="content-table-div">    
            <CountryMetadata country={props.country}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
  
const CountryFlag = (props) => {
  const {flag, name} = props.country;
  return (
    <img className="country-flag-img" src={flag} alt={name}/>
  )
}
  
const CountryName = (props) => {
  const {name} = props.country;
  return (
    <h2 className="country-title-h2">
    {name}
    </h2>
  )
}

const CountryMetadata = (props) => {
  const {code, continent, language, capital, currency} = props.country;
  const context = React.useContext(ThemeContext);
  const {t} = useTranslation()

  return (
    <table className="content-table" theme={context}>
      <thead>
          <tr>
              <th className="no-select">{t("metadata")}</th>
              <th className="no-select">{t("value")}</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td className="no-select">{t("code")}</td>
              <td>{code}</td>
          </tr>
          <tr>
              <td className="no-select">{t("continent")}</td>
              <td>{continent}</td>
          </tr>
          <tr>
              <td className="no-select">{t("language")}</td>
              <td>{language.join(", ")}</td>
          </tr>
          <tr>
              <td className="no-select">{t("capital")}</td>
              <td>{capital}</td>
          </tr>
          <tr>
              <td className="no-select">{t("currency")}</td>
              <td>{currency}</td>
          </tr>
      </tbody>
    </table>
  )
}

const  JSXCountries = (countries) => {
  return (countries.map((country) => {
      return (
        <Country key={country.code} country={country}/>
      );
  })
  )
}



class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {countries: this.props.t("countries:countries", {returnObjects: true})};
  }

  componentWillReceiveProps(prevProps, prevState) {

    let countries = this.props.t("countries:countries", {returnObjects: true});
    let tempCountries = [];
    
    countries.forEach((country) => {
        if (country.name.toLowerCase().includes(prevProps.searchValue.toLowerCase()) || prevProps.searchValue === '') {
            tempCountries.push(country);
        }
    })

    console.log(prevProps.sortValue);
    
    let sortDict = {
      "alphabetical": (countryA, countryB) => countryA.name.localeCompare(countryB.name),
      "code": (countryA, countryB) => countryA.code.localeCompare(countryB.code),
      "continent": (countryA, countryB) => countryA.continent.localeCompare(countryB.continent),
      "noOfLanguages": (countryA, countryB) => countryB.language.length - countryA.language.length,
      "capital": (countryA, countryB) => countryA.capital.localeCompare(countryB.capital),
      "currency": (countryA, countryB) => countryA.currency.localeCompare(countryB.currency),
      "noOfLetters": (countryA, countryB) => countryB.name.length - countryA.name.length
    }   
    
    
    tempCountries.sort((countryA, countryB) => {
      return sortDict[prevProps.sortValue[0].id](countryA, countryB) || sortDict[prevProps.sortValue[1].id](countryA, countryB) || sortDict[prevProps.sortValue[2].id](countryA, countryB) || sortDict[prevProps.sortValue[3].id](countryA, countryB) || sortDict[prevProps.sortValue[4].id](countryA, countryB) || sortDict[prevProps.sortValue[5].id](countryA, countryB)
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