import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_LAT = 28.4202;
const DEFAULT_LNG = 70.2989;

const greenMarkerIcon = L.divIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38" style="display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))"><path d="M14 0C6.3 0 0 6.3 0 14c0 9.8 14 24 14 24s14-14.2 14-24C28 6.3 21.7 0 14 0z" fill="#22c55e"/><circle cx="14" cy="13" r="5" fill="#fff"/></svg>`,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
});

type LocationMapProps = {
  locationName?: string;
  latitude: string;
  longitude: string;
  className?: string;
  interactive?: boolean;
  onMarkerChange?: (lat: string, lng: string) => void;
};

function parseCoords(latitude: string, longitude: string) {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng, valid: true };
  }
  return { lat: DEFAULT_LAT, lng: DEFAULT_LNG, valid: false };
}

function LocationMapLeaflet({
  latitude,
  longitude,
  className = "",
  interactive = false,
  onMarkerChange,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onMarkerChangeRef = useRef(onMarkerChange);
  onMarkerChangeRef.current = onMarkerChange;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: interactive,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    if (interactive) {
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current?.setLatLng(e.latlng);
        onMarkerChangeRef.current?.(lat.toFixed(6), lng.toFixed(6));
      });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [interactive]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const { lat, lng, valid } = parseCoords(latitude, longitude);
    const position: L.LatLngExpression = [lat, lng];

    if (!markerRef.current) {
      const marker = L.marker(position, {
        icon: greenMarkerIcon,
        draggable: interactive,
      }).addTo(map);

      if (interactive) {
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          onMarkerChangeRef.current?.(pos.lat.toFixed(6), pos.lng.toFixed(6));
        });
      }

      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(position);
      if (markerRef.current.dragging) {
        markerRef.current.dragging[interactive ? "enable" : "disable"]();
      }
    }

    map.setView(position, valid ? 10 : 4);
  }, [latitude, longitude, interactive]);

  return <div ref={containerRef} className={`w-full h-full min-h-[220px] ${className}`} />;
}

export function LocationMapEmbed(props: LocationMapProps) {
  return <LocationMapLeaflet {...props} interactive={false} />;
}

export function LocationMapInteractive(
  props: Omit<LocationMapProps, "interactive"> & {
    onMarkerChange: (lat: string, lng: string) => void;
  }
) {
  return <LocationMapLeaflet {...props} interactive />;
}
