import { divIcon, icon, LatLng } from "leaflet"
import L from 'leaflet';
import { Circle } from "@phosphor-icons/react/dist/ssr/Circle";
import { renderToString } from 'react-dom/server';

export const GOOGLEMAPSETTING : any = (lat : any, lng : any) => `https://www.google.co.jp/maps/@${lat},${lng},${20}z`

export const mapStyles = {
  google: {
    attribution: "https://developers.google.com/maps/documentation",
    style: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
  },
  blackWhite: {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    style: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
  monochro: {
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    style:
      "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png",
  },
  template: { attribution: "", style: "" },
};


//Marker Icon
export const ICON_USER = icon({
  iconUrl: "/images/crosshair-fill.svg",
  iconSize: [25, 40],
  iconAnchor: [12, 20],
  popupAnchor: [0, -30],
});

export const ICON_PIN = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 40],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30],
});

export const ICON_Marker = icon({
  iconUrl: "/images/circleRed.svg",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -30],
  className: 'text-blue-400'
});

export const ICON_HIGHLIGHTED = icon({
  iconUrl: "/images/map-pin-fill.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 24],
  popupAnchor: [0, -35],
});

export const ICON_PlanMarker = icon({
  iconUrl: "/images/circleBlue.svg",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -30],
  className: 'text-blue-400'
});

export const ICON_PLAN_HIGHLIGHTED = icon({
  iconUrl: "/images/map-pin-fill-Blue.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 24],
  popupAnchor: [0, -35],
});

// LineColor
export const LINE_COLOR = {
  red : { color: "#ff1100"},
  paleRed : { color: "#f47971", dashArray: '10, 10' },
  blue : { color: "#000dbd"},
  green : {color: "#00c73c"},
  yellow : {color: "#ffe229"},
  }



//CircleOption
export const CIRCLE_OPTION = {
  color: 'green',           // 境界線の色
  fillColor: '#b3ffbf',      // 塗りつぶしの色
  fillOpacity: 0.1,       // 塗りつぶしの透明度（0-1）
  weight: 1,              // 境界線の太さ（ピクセル）
}