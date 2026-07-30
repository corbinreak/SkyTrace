import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import FlightMarker from "./FlightMarker.jsx";
import { getAccessToken, fetchFlightData } from "../services/OpenskyService.js";
import "../css/RadarMapContainer.css";
import "leaflet/dist/leaflet.css";

function RadarMapContainer() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFlightData();
        setFlights(data);
        //  // if (data.length > 0) {
        //     console.log(
        //       "Updated flights at",
        //       new Date().toLocaleTimeString(),
        //       data[0]?.latitude,
        //       data[0]?.longitude,
        //     );
        //   } else {
        //     console.log(
        //       "Updated flights at",
        //       new Date().toLocaleTimeString(),
        //       "- No flights found",
        //     );
        //  }
      } catch (err) {
        console.error("Error fetching flight data:", err);
      }
    }
    loadData();

    const intervalId = setInterval(loadData, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (flights) {
      console.log("Flight data loaded:", flights);
      console.log("Number of flights:", flights.length);
    }
  }, [flights]);

  const position = [40.3975, -105.0745]; // Base map for Loveland Co (My hometown)

  return (
    <MapContainer center={position} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flights.map((flight) => (
        <FlightMarker key={flight.icao24} flight={flight} />
      ))}
    </MapContainer>
  );
}

export default RadarMapContainer;
