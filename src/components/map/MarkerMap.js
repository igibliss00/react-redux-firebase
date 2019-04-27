import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.defaultCenter.lat, lng: props.defaultCenter.lng }}
  >
    <Marker
      position={{ lat: props.item.lat, lng: props.item.lng }}
    />
  </GoogleMap>
);


export default MapWithAMarker;