import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  eventName: string;
}

export default function InteractiveMap({ latitude, longitude, zoom, eventName }: InteractiveMapProps) {
  const position: [number, number] = [latitude, longitude];

  useEffect(() => {
    // Fix for default marker icon issues with Webpack/React-Leaflet
    // This logic must run on the client side
    const iconDefault = L.Icon.Default as any;
    
    // Clean up previous prototype if needed or just reset options
    if (iconDefault.prototype._getIconUrl) {
        delete iconDefault.prototype._getIconUrl;
    }

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
      iconUrl: '/leaflet/images/marker-icon.png',
      shadowUrl: '/leaflet/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-full w-full relative z-0">
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-lg">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
            Ubicación del evento: <br />
            <b>{eventName}</b>
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  );
}

