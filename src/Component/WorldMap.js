import React from 'react';
import "../style/map.css"
import "../style/worldMap.css"
import "leaflet/dist/leaflet.css";
import mapData from '../data/countries.json'
import {useMap, MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
const flags = {};
function importAll(r) {
    r.keys().forEach((key) => (flags[key] = r(key)));
}
importAll(require.context("../icons/flag", false, /\.(png|jpe?g|svg)$/));

const MapLoader = () => {
    const mapInstance = useMap();
    setTimeout(function () {
        mapInstance.invalidateSize(true);
     }, 100);
    return null;
}

const WorldMap = (props) => {

    const history = useHistory();
    console.log(history);
    
    const {t} = useTranslation(); 
    const countries = t("countries:memberOfUNCountries", {returnObjects: true});

    function defaultStyle(feature) {
      return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "transparent", //Outline color
        fillOpacity: 1
      };
    }

    function hoverStyle(feature) {
        return {
          fillColor: "RGB(209, 220, 234, 0.4)",
          weight: 2,
          opacity: 1,
          color: "RGB(136, 160, 192)", //Outline color
          fillOpacity: 1
        };
      }
    
    const onEachCountry = (feature, layer) => {
        const ISO3 = feature.properties.ISO_A3;
        const country = countries.filter((countries) => countries.ISO3 === ISO3)[0];

        var countryName = feature.properties.ADMIN;
        var flag = null;

        if (country !== undefined) {
          const {name, ISO2} = country;
          countryName = name;
          const flagDir = "./" + ISO2.toLowerCase() + ".svg";
          if (flags[flagDir] !== undefined) {
            flag = flags[flagDir].default;
          }
        }

        layer.bindTooltip(`<img
        width="100px"
        src=${flag}
        alt=${countryName}
        draggable={false}/>
        <div
        >${countryName}</div>`);

        layer.on({
          click: (event) => {
            history.push(`/country/${ISO3}`)
          }
        });

        layer.on({
          mouseover: (event) => {
            layer.setStyle(hoverStyle());
          }
        });

        layer.on({
          mouseout: (event) => {
            layer.setStyle(defaultStyle());
          }
        });
    }

    return (
    <MapContainer
    center={[0, 0]}
    zoom={2}
    scrollWheelZoom={true}
    >
        <MapLoader/>
        <TileLayer
        url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        maxZoom="16"
        />
        <GeoJSON
        data={mapData}
        style={defaultStyle}
        onEachFeature={onEachCountry}/>
    </MapContainer>
    )
}

export default WorldMap;