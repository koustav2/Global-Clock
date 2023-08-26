import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import useLocation from './useLoaction';


interface WeatherData {
    temp_c: number;
    temp_f: number;
    wind_kph: number,
    wind_mph: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    humidity: number,
    wind_degree: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    vis_km: number,
    
}

interface Coordinates {
    lat: number | undefined;
    lon: number | undefined;
}

export const getWeather = async ({ lat, lon }: Coordinates): Promise<WeatherData> => {
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${lat},${lon}`
    );
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data.current;
};

export function useWeatherQuery() {
    const { lat, lon } = useLocation();
    return useQuery<WeatherData, Error>(['weather', { lat, lon }], () => getWeather({ lat, lon }));
}
