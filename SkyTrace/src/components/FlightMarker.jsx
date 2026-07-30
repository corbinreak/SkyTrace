import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import TelemetryPopup from "./TelemetryPopup.jsx";

function getPlaneColor(flight) {
  if (flight.onGround) return "9ca3af";
  if (flight.baroAltitude > 30000) return "38bdf8";
  if (flight.baroAltitude > 10000) return "4ade80";
  return "fbbf24";
}

function FlightMarker({ flight }) {
  const planeColor = getPlaneColor(flight);

  const planeIcon = new L.divIcon({
    className: "plane-icon",
    html: `<div style="transform: rotate(${flight.trueTrack || 0}deg); transform-origin: 14px 14px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.6));">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${planeColor}" stroke="#1e293b" stroke-width="0.5" stroke-linejoin="round" width="28" height="28">
            <path d="M12 2C11.5 2 11 205 11 3V9.2L3.5 14V16L11 13.5V18.5L8.5 20V21.5L12 20.5L15.5 21.5V20L13 18.5V13.5L20.5 16V14L13 9.2V3C13 2.5 12.5 2 12 2Z" />
            </svg>
            </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
  return (
    <Marker position={[flight.latitude, flight.longitude]} icon={planeIcon}>
      <Popup>
        <TelemetryPopup flight={flight} />
      </Popup>
    </Marker>
  );
}

export default FlightMarker;
