'use client'

import { useState, useEffect } from 'react'


export default function useLocation() {
    const [lat, setLat] = useState<number>()
    const [lon, setLon] = useState<number>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            },
            (err) => {
                setError(err.message)
            }
        )
    }
        , [])
    return { lat, lon, error }
}