import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import marker from "../../../assets/images/marker.svg";
import orangeMarker from "../../../assets/images/orangeMarker.svg";
import { useSelector } from "react-redux";

const markerIcons = {
  lowRisk: new L.Icon({
    iconUrl: marker, // Change this to the path of your green marker icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  mediumRisk: new L.Icon({
    iconUrl: orangeMarker, // Change this to the path of your orange marker icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  highRisk: new L.Icon({
    iconUrl: orangeMarker, // Change this to the path of your red marker icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
};
const riskIndex = [
  { id: 1, risk: 2 },
  { id: 2, risk: 4 },
  { id: 3, risk: 3 },
];
const Map = ({ locations, filteredLocation }) => {
  // const [selectedMarker, setSelectedMarker] = useState(null);
  const formData = useSelector((state) => state.todos);
  // const markerIcon = new L.icon({
  //   iconUrl: marker,
  //   iconSize: [32, 60],
  //   iconAnchor: [16, 32],
  // });
  const markers = locations.map((item, index) => ({
    position: item,
    risk: riskIndex[index] ? riskIndex[index].risk : 0,
    popupText: `Marker ${index + 1}`,
  }));

  const getMarkerIcon = (risk) => {
    if (risk <= 2) {
      return markerIcons.lowRisk;
    } else if (risk <= 3) {
      return markerIcons.mediumRisk;
    } else {
      return markerIcons.highRisk;
    }
  };
  // const handleMarkerClick = (index) => {
  //   setSelectedMarker(index);
  // };
  return (
    <MapContainer
      center={[formData.latitude, formData.longitude]}
      zoom={6}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={marker.position}
            icon={
              filteredLocation[0] === marker.position[0] &&
              filteredLocation[1] === marker.position[1]
                ? new L.Icon({
                    iconUrl: getMarkerIcon(marker.risk).options.iconUrl,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  })
                : getMarkerIcon(marker.risk)
            }
          ></Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
