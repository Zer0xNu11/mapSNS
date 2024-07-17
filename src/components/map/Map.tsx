'use client'
import { MapContainer, TileLayer } from 'react-leaflet'
import { latLng } from "leaflet"
import "leaflet/dist/leaflet.css";
import "./map.css";
import { LocationMarkers } from './LocationMarkers';


const Map = () : JSX.Element => {
  // 緯度軽度
  const position = latLng([35.3607411, 138.727262]);
  // 初期マップズームレベル
  const zoom = 13;
  const mapStyles = {
    google: {attribution:'https://developers.google.com/maps/documentation', style:"https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"},
    blackWhite: {attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' ,style:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'},
    monochro:{attribution:'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',style:'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png'},
    template:{attribution:'',style:''}	

  }
  const mapStyle = mapStyles.google

  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
          attribution={mapStyle.attribution}
          url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <LocationMarkers/>
    </MapContainer>
  );
}

export default Map;