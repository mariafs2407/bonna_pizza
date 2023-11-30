import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapView = ({ onMapClick }) => {
  const [position, setPosition] = React.useState({ lat: -12.0464, lng: -77.0428 }); // Coordenadas iniciales de Lima, Perú
  const [zoom, setZoom] = React.useState(10);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setZoom(20);
    });
  }, []);

  const updatePosition = (event) => {
    setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDIPkzk4HFDFDh6luCvOUEPzp1F6pXhxaY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={position}
        zoom={zoom}
        onClick={(event) => {
          updatePosition(event);
          onMapClick(event);
        }}
      >
        <Marker
          position={position}
          draggable={true}
          onDragEnd={updatePosition}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
