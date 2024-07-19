'use client'
import Map from '@/components/map/Map'
import dynamic from 'next/dynamic';
import React from 'react'


const MapPage = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), { //SSR停止　window error防止
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map />
    </div>
  )
}

export default MapPage
