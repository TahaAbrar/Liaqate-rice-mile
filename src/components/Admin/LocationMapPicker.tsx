import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { LocationMapInteractive } from "../LocationMap";
import { geocodeAddress, reverseGeocodeCoords } from "../../api";

interface LocationMapPickerProps {
  locationName: string;
  latitude: string;
  longitude: string;
  onLocationNameChange: (val: string) => void;
  onLatitudeChange: (val: string) => void;
  onLongitudeChange: (val: string) => void;
}

export default function LocationMapPicker({
  locationName,
  latitude,
  longitude,
  onLocationNameChange,
  onLatitudeChange,
  onLongitudeChange,
}: LocationMapPickerProps) {
  const [geocoding, setGeocoding] = useState(false);
  const skipAddressGeocodeRef = useRef(false);
  const lastGeocodedAddressRef = useRef(locationName);
  const callbacksRef = useRef({
    onLocationNameChange,
    onLatitudeChange,
    onLongitudeChange,
  });
  callbacksRef.current = { onLocationNameChange, onLatitudeChange, onLongitudeChange };

  useEffect(() => {
    const query = locationName.trim();
    if (query.length < 3) return;
    if (skipAddressGeocodeRef.current) {
      skipAddressGeocodeRef.current = false;
      return;
    }
    if (query === lastGeocodedAddressRef.current) return;

    const timer = window.setTimeout(async () => {
      setGeocoding(true);
      try {
        const result = await geocodeAddress(query);
        lastGeocodedAddressRef.current = result.displayName;
        skipAddressGeocodeRef.current = true;
        callbacksRef.current.onLatitudeChange(result.latitude);
        callbacksRef.current.onLongitudeChange(result.longitude);
        if (result.displayName && result.displayName !== query) {
          skipAddressGeocodeRef.current = true;
          callbacksRef.current.onLocationNameChange(result.displayName);
        }
      } catch {
        // Address not found — user can adjust coordinates manually
      } finally {
        setGeocoding(false);
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, [locationName]);

  const handleMarkerChange = useCallback(
    async (lat: string, lng: string) => {
      skipAddressGeocodeRef.current = true;
      onLatitudeChange(lat);
      onLongitudeChange(lng);
      setGeocoding(true);
      try {
        const result = await reverseGeocodeCoords(lat, lng);
        lastGeocodedAddressRef.current = result.displayName;
        skipAddressGeocodeRef.current = true;
        onLocationNameChange(result.displayName);
      } catch {
        // Keep coordinates even if reverse geocode fails
      } finally {
        setGeocoding(false);
      }
    },
    [onLatitudeChange, onLongitudeChange, onLocationNameChange]
  );

  return (
    <div className="space-y-4 p-4 bg-white border border-outline-variant/30 rounded-xl">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <h4 className="font-serif-title text-sm text-secondary font-bold">Business Location Map</h4>
      </div>
      <p className="text-[10px] font-sans text-slate-500">
        Type your mill or office location. The map will update on the website wherever your footprint is shown.
      </p>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase">
          Location Name / Address
        </label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => onLocationNameChange(e.target.value)}
          placeholder="e.g. Liaqat Rice Mill, Punjab, Pakistan"
          className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => onLatitudeChange(e.target.value)}
            placeholder="31.1704"
            className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => onLongitudeChange(e.target.value)}
            placeholder="72.7097"
            className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {geocoding && (
        <p className="text-[10px] text-slate-400 font-sans">Updating map location…</p>
      )}

      <div className="h-64 w-full rounded-xl overflow-hidden border border-outline-variant/30 bg-white">
        <LocationMapInteractive
          locationName={locationName}
          latitude={latitude}
          longitude={longitude}
          onMarkerChange={handleMarkerChange}
        />
      </div>
    </div>
  );
}
