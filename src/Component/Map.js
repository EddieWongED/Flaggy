import React from 'react';
import L, { LatLngExpression } from "leaflet";
import "../style/map.css"
import "leaflet/dist/leaflet.css";
import {useMap, MapContainer, TileLayer, GeoJSON} from 'react-leaflet';

const areaZoomConversion = (area) => {
    if (area > 15000000) {
        return 2;
    } else if (area > 9000000) {
        return 3;
    } else if (area > 1500000) {
        return 4;
    } else if (area > 350000) {
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
    return 1;
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

const Map = (props) => {

    const {country} = props;
    const {ISO3, area} = country;

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
    
    return (
    <MapContainer
    center={[33.939110, 67.709953]}
    zoom={areaZoomConversion(area)}
    scrollWheelZoom={true}
    >
        <MapLoader/>
        <MapFocuser geoJSON={geoJSON}/>
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