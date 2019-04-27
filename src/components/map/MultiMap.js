import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MultiMap = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.defaultCenter}
  >
  {props.items && props.items.map((item, key) => <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} />)}
  </GoogleMap>
);

export default MultiMap;