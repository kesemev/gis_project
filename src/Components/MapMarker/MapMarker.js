import React from "react";
import { Marker, Tooltip } from "react-leaflet";

const MapMarker = ({ position, onClick, toolTipTitle }) => {
  const openTooltip = (marker) => {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openTooltip();
      });
    }
  };
  return (
    <Marker
      onClick={onClick}
      position={[position.latitude, position.longitude]}
      ref={openTooltip}
    >
      <Tooltip>{toolTipTitle}</Tooltip>
    </Marker>
  );
};

export default MapMarker;
