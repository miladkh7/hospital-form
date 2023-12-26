import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import marker from "../../../assets/images/marker.svg";
import { useSelector } from "react-redux";
const riskIndex = [
  { id: 1, risk: 2 },
  { id: 2, risk: 4 },
  { id: 3, risk: 3 },
];
const Map = ({ locations }) => {
  const formData = useSelector((state) => state.todos);
  const markerIcon = new L.icon({
    iconUrl: marker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  const markers = locations.map((item, index) => ({
    position: item,
    popupText: `Marker ${index + 1}`,
  }));

  return (
    <MapContainer
      center={[formData.latitude, formData.longitude]} // Initial map center coordinates
      zoom={6} // Initial zoom level
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={markerIcon}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
