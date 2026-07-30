import { Marker, Popup } from "react-leaflet";
import TelemetryPopup from "./TelemetryPopup.jsx";

function FlightMarker({ flight }) {
  return (
    <Marker position={[flight.latitude, flight.longitude]}>
      <Popup>
        <TelemetryPopup flight={flight} />
      </Popup>
    </Marker>
  );
}

export default FlightMarker;
