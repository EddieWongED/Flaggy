import React from 'react'
import { useParams } from "react-router";
import {ThemeContext} from '../Theme';
import "../style/country.css"
import "../index.css"
import favouriteImg from "../icons/favouriteIcon.svg"
import { useTranslation } from 'react-i18next';
import Delayed from './Delayed';
import Error from './Error';
import Map from "./Map"

const flags = {};

function importAll(r) {
    r.keys().forEach((key) => (flags[key] = r(key)));
}

importAll(require.context("../icons/flag", false, /\.(png|jpe?g|svg)$/));

function findCountry(countries, code) {
    const search = code.replace(/[-_]/g, " ");
 
    const check = ["ISO2", "ISO3", "name"];
    for (var i = 0; i < check.length; i++) {
        const country = countries.filter((country) => {
            if (typeof country[check[i]] === "string") {
                return country[check[i]].toLowerCase() === search.toLowerCase();
            } else {
                return false;
            }
        })[0];
        if (country !== undefined) {
            return country;
        }
    }
    return null;
}

const Country = () => {
    const {code} = useParams();
    const context = React.useContext(ThemeContext);
    const { t } = useTranslation();
    const countries = t("countries:memberOfUNCountries", {returnObjects: true});

    const country = findCountry(countries, code) || {name:"", ISO2:""};

        const {name} = country;

        const [favourite, setFavourite] = React.useState(JSON.parse(localStorage.getItem("favourite")).includes(country.ISO2));

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
    if (JSON.stringify(country) !== JSON.stringify({name:"", ISO2:""})) {
        return (
            <div
            className="country-page-div">
            <div
            className="country-page-top-bar-div">
                <div
                className="country-page-country-name">
                {name}
                </div>
                <div
                className="country-page-favourite-img-div no-select">
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
            </div>
            <div
            className="country-page-content-div">
                <div
                className="country-page-content-left-div">
                    <div
                    className="country-page-flag-div no-select">
                    <CountryPageFlag
                    country={country}/>
                    </div>
                    <div
                    className="content-table-div">
                    <CountryMetadata
                    country={country}/>
                    </div>
                </div>
                <div
                className="country-page-map-div">
                    <Delayed
                    waitBeforeShow={500} animation={true}>
                        <Map country={country}/>
                    </Delayed>
                </div>
            </div>
            </div>
        )
    } else {
        const msg = "Could not find the country! Please check the ISO2 Code/ ISO3 Code/ Name is correctly inputted";
        return (
            <Error msg={msg}/>
        )
    }
}


const CountryPageFlag = (props) => {
    const {country} = props
    const {name, ISO2} = country;
  
    const flagDir = "./" + ISO2.toLowerCase() + ".svg";
    var flag = null;
    if (flags[flagDir] !== undefined) {
      flag = flags[flagDir].default;
    }
     
    return (
      <img
      className="country-page-flag-img"
      src={flag}
      alt={name}
      draggable={false}/>
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

export default Country;