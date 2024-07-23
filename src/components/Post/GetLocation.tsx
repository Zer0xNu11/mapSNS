'use client'
//未使用
import { useEffect, useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setError(`Error: ${error.message}`);
      }
    );
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!location) return <p>Loading location...</p>;

  return (
    <div>
      <h2>Your Current Location</h2>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}

export default GetLocation