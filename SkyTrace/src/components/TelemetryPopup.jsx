function TelemetryPopup({ flight }) {
  return (
    <div>
      <p>{flight.callsign?.trim() || "UNKNOWN"}</p>
      <p>ICAO24: {flight.icao24}</p>
      <p>Origin Country: {flight.originCountry}</p>
      <p>Latitude: {flight.latitude}</p>
      <p>Longitude: {flight.longitude}</p>
      <p>Altitude: {flight.baroAltitude} ft</p>
      <p>Velocity: {flight.velocity} kts</p>
      <p>On Ground: {flight.onGround ? "Yes" : "No"}</p>
      <p>
        Last Contact: {new Date(flight.lastContact * 1000).toLocaleString()}
      </p>
      <p>
        Time Position: {new Date(flight.timePosition * 1000).toLocaleString()}
      </p>
      <p>True Track: {flight.trueTrack}</p>
    </div>
  );
}

export default TelemetryPopup;
