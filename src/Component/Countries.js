import React from 'react'
import '../index.css'
import {ThemeContext} from '../Theme';

const Country = (props) => {
  
  const context = React.useContext(ThemeContext);

  const handleClick = (e) => {
    alert("You are clicking: " + props.country.englishName);
  }
  
  // returning a JSX
  return (
    <React.Fragment>
      <div className='country-div' onClick={handleClick} theme={context}>
        <div className="country-content-div">
          <div className="country-flag-div">
            <CountryFlag country={props.country}/>
          </div>
          <div className="country-title-div">  
            <CountryName country={props.country} lang={props.lang}/>
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
  const {flag, englishName} = props.country;
  return (
    <img className="country-flag-img" src={flag} alt={englishName}/>
  )
}
  
const CountryName = (props) => {
  let name = props.lang === "English" ? props.country.englishName : props.country.chineseName;
  return (
    <h2 className="country-title-h2">
    {name}
    </h2>
  )
}

const CountryMetadata = (props) => {
  const {code, continent, language, capitalEnglish, capitalChinese, currency} = props.country;
  const context = React.useContext(ThemeContext);
  return (
    <table className="content-table" theme={context}>
      <thead>
          <tr>
              <th>Metadata</th>
              <th>Value</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Code</td>
              <td>{code}</td>
          </tr>
          <tr>
              <td>Continent</td>
              <td>{continent}</td>
          </tr>
          <tr>
              <td>Language</td>
              <td>{language}</td>
          </tr>
          <tr>
              <td>Capital</td>
              <td>{capitalEnglish} ({capitalChinese})</td>
          </tr>
          <tr>
              <td>Currency</td>
              <td>{currency}</td>
          </tr>
      </tbody>
    </table>
  )
}

const JSXCountries = (countries, search, lang) => {
  return (countries.map((country) => {
    if (country.englishName.toLowerCase().includes(search.toLowerCase()) || search === '')
      return (
        <Country key={country.code} country={country} lang={lang}/>
      );
    return null;
  })
  )
}

const Countries = (props) => {
  return (
        <React.Fragment>
          {JSXCountries(props.countries, props.search, props.lang)}
        </React.Fragment>
  )
}

export default Countries;