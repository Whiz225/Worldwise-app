import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import { useLocation } from "react-router-dom";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  // Only show map on /app/map route
  if (!location.pathname.includes("/app/map")) {
    return null;
  }

  const handleMapClick = (e) => {
    navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  };

  const handleMarkerClick = (cityId) => {
    navigate(`../cities/${cityId}`);
  };

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        touchZoom={true}
        tap={true}
        whenReady={(map) => {
          map.target.on("click", handleMapClick);
          map.target.on("tap", handleMapClick);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
            eventHandlers={{
              click: () => handleMarkerClick(city.id),
            }}
          >
            <Popup>
              <div
                onClick={() => handleMarkerClick(city.id)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  fontSize: "1.4rem",
                }}
              >
                <span style={{ fontSize: "2rem", marginRight: "10px" }}>
                  {city.emoji}
                </span>
                <span>{city.cityName}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
