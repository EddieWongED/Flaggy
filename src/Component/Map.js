import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import {useMap, MapContainer, TileLayer, GeoJSON, Marker, Popup} from 'react-leaflet';
import iconImg from '../icons/logo.svg';
import "../style/map.css"

const areaZoomConversion = (area) => {
    if (area > 15000000) {
        return 2;
    } else if (area > 9000000) {
        return 3;
    } else if (area > 1500000) {
        return 4;
    } else if (area > 240000) {
        return 5;
    } else if (area > 25000) {
        return 6;
    } else if (area > 10000) {
        return 7;
    } else if (area > 5000) {
        return 8;
    } else if (area > 100) {
        return 9;
    } else if (area > 0) {
        return 10;
    }
    return 2;
}

const MapLoader = () => {
    const mapInstance = useMap();
    setTimeout(function () {
        mapInstance.invalidateSize(true);
     }, 100);
    return null;
}


const MapFocuser = (props) => {

    const {geoJSON} = props;
    const mapInstance = useMap();

    React.useEffect(() => {
        if (geoJSON !== null) {
            mapInstance.setView(geoJSON.features[0].properties.centroid.reverse());
        }
    }, [geoJSON]);
    return null;
}

var markerIcon = L.icon({
    iconUrl: require('../icons/logo.svg'),
    shadowUrl: require('../icons/logo.svg'),

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Map = (props) => {
    
    const {country} = props;

    var ISO3, area, capitalPosition, capital;

    if (country !== undefined) {
        ISO3 = country.ISO3;
        area = country.area;
        capital = country.capital;
        capitalPosition = [country.capitalLatitude, country.capitalLongitude]
    }

    const [geoJSON, setGeoJSON] = React.useState(null);

    const fetchGeoJSON = () => {
        const url = `https://raw.githubusercontent.com/inmagik/world-countries/master/countries/${ISO3}.geojson`;

        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            setGeoJSON(data);
        });
      };
    
    React.useEffect(() => {
        fetchGeoJSON();
    }, []);


    function style(feature) {
        return {
          fillColor: "RGB(209, 220, 234, 0.4)",
          weight: 2,
          opacity: 1,
          color: "RGB(136, 160, 192)", //Outline color
          fillOpacity: 1
        };
      }
    
    const iconMarkup = renderToStaticMarkup(<img src={iconImg} alt="marker" height="40px"/>);
    const customMarkerIcon = divIcon({
        html: iconMarkup,
        className: ""
      });
    
    const MarkerHandler = (e) => {
        console.log(e);
    }

    return (
    <MapContainer
    center={[12, 12]}
    zoom={areaZoomConversion(area)}
    scrollWheelZoom={true}>
        <MapLoader/>
        <MapFocuser
        geoJSON={geoJSON}/>
        <Marker
        icon={customMarkerIcon}
        position={capitalPosition}>
            <Popup className="capital-popup">
                {capital}
            </Popup>
        </Marker>
        <TileLayer
        url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        maxZoom="16"
        />
        {geoJSON && <GeoJSON data={geoJSON} style={style}/>}
    </MapContainer>
    )
}

export default Map;