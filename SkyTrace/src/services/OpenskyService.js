const BASE_URL = import.meta.env.VITE_OPENSKY_BASE_URL || "";
const CLIENT_ID = import.meta.env.VITE_OPENSKY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_OPENSKY_CLIENT_SECRET;
const USE_PROXY = import.meta.env.DEV && !BASE_URL;

function tokenEndpoint() {
  if (USE_PROXY)
    return "/opensky-auth/auth/realms/opensky-network/protocol/openid-connect/token"; // proxied by Vite (includes /auth)
  if (BASE_URL)
    return `${BASE_URL.replace(/\/$/, "")}/auth/realms/opensky-network/protocol/openid-connect/token`;
  return "/opensky-auth/auth/realms/opensky-network/protocol/openid-connect/token";
}

function statesEndpoint() {
  if (USE_PROXY) return "/opensky-api/api/states/all"; // proxied by Vite
  if (BASE_URL)
    return `${BASE_URL.replace(/\/$/, "")}/opensky-api/api/states/all`;
  return "/opensky-api/api/states/all";
}

export async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Client ID or Client Secret is not defined in environment variables.",
    );
  }

  const tokenUrl = tokenEndpoint();
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  const text = await response.text();
  if (!response.ok)
    throw new Error(`Failed to get access token (${response.status}): ${text}`);
  return JSON.parse(text).access_token;
}

export async function fetchFlightData() {
  const accessToken = await getAccessToken();
  const flightDataUrl = statesEndpoint();

  const response = await fetch(flightDataUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();
  if (!response.ok)
    throw new Error(
      `Failed to fetch flight data (${response.status}): ${text}`,
    );

  const rawData = JSON.parse(text);
  console.log("A: Raw data object kes:", Object.keys(rawData));
  console.log(
    "B: rawData.states type/value:",
    typeof rawData.states,
    rawData.states,
  );

  if (!rawData.states) {
    console.warn(
      "Warning: rawData.states is undefined or null. Returning empty array.",
    );
    return [];
  }

  console.log("C: rawData.states length:", rawData.states.length);
  console.log(
    "D: First 5 elements of rawData.states:",
    rawData.states.slice(0, 5),
  );

  function mapVectorToFlight(vector) {
    return {
      icao24: vector[0],
      callsign: vector[1] ? vector[1].trim() : null,
      originCountry: vector[2],
      timePosition: vector[3],
      lastContact: vector[4],
      longitude: vector[5], // lng
      latitude: vector[6], // lat
      baroAltitude: vector[7],
      onGround: vector[8],
      velocity: vector[9],
      trueTrack: vector[10],
      verticalRate: vector[11],
      sensors: vector[12],
      geoAltitude: vector[13],
      squawk: vector[14],
    };
  }

  const formattedFlights = rawData.states
    .filter((vector) => vector[5] !== null && vector[6] !== null)
    .map(mapVectorToFlight);
  console.log("E: Formatted flights length:", formattedFlights.length);
  return formattedFlights;
}
