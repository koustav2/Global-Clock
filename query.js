
import useLocation from '@/hooks/useLoaction';
import { useQuery, useQueryClient } from '@tanstack/react-query';


const getWeather = async ({ lat, lon }) => {
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${lat},${lon}`
    );
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data.current;
};

// export function useWeatherQuery() {
//     // const { lat, lon } = useLocation()
//     return useQuery(['weather', { lat, lon }], () => getWeather({ lat, lon }));
// }

export function setWeatherData(queryClient, lat, lon, data) {
    queryClient.setQueryData(['weather', { lat, lon }], data);
}

