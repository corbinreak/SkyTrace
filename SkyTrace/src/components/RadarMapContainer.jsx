import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../css/RadarMapContainer.css";
import "leaflet/dist/leaflet.css";

function RadarMapContainer() {
  const position = [40.3975, -105.0745]; // Base map for Loveland Co (My hometown)

  return (
    <MapContainer center={position} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Loveland, CO</Popup>
      </Marker>
    </MapContainer>
  );
}

export default RadarMapContainer;
