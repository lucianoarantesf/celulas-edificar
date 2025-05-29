"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { SUPABASE_URL, supabaseHeaders } from '../../lib/supabase';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

export default function MapNoSSR() {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/CelulaEdificar?select=*`, { headers: supabaseHeaders })
      .then((res) => res.json())
      .then(async (data) => {
        const coordArray = await Promise.all(data.map(async (c) => {
          const endereco = `${c.logradouro}, ${c.numero}, ${c.cidade}, ${c.uf}`;
          const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
          const geo = await resp.json();
          if (geo.length > 0) {
            return {
              lat: parseFloat(geo[0].lat),
              lon: parseFloat(geo[0].lon),
              nome: c.nomeCelula
            };
          }
          return null;
        }));
        setCoords(coordArray.filter(Boolean));
      });
  }, []);

  return (
    <MapContainer center={[-18.9186, -48.2773]} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coords.map((c, idx) => (
        <Marker key={idx} position={[c.lat, c.lon]}>
          <Popup>{c.nome}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
