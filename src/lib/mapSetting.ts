import { LatLng } from "leaflet"

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