'use client'

import { useGlobalContext } from '@/context/Context';
import useLocation from '@/hooks/useLoaction';
import { apiUrl } from '@/utils/URL';
import React, { useCallback } from 'react'
import Quotes from './Quotes';
import { motion } from 'framer-motion'
import Image from 'next/image';
import { Moon, Sun } from '../../public/svgs';
import CurrentTime from './CurrentTime';
import CurrentWeather from './CurrentWeather';
import Location from './Location';
type Props = {}
interface WeatherProps {
    condition: { text: string; icon: string },
    temp_c: number,
    temp_f: number,
    feelslike_c: number,
    feelslike_f: number,
    wind_kph: number,
    wind_mph: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    humidity: number
    is_day: number

}

const today = new Date()
const formatToday = new Intl.DateTimeFormat('en-us', {
    dayPeriod: 'short',
})
const dayPeriod = formatToday.format(today)


function DisplayTime({ }: Props) {
    const [weather, setWeather] = React.useState<WeatherProps>()
    const { lat, lon } = useLocation()
    const { infosContainer, message, setMessage } = useGlobalContext()

    const getWeather = useCallback(async () => {
        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${lat},${lon}`
            )
            const data = await res.json()
            setWeather(data.current)

        } catch (error) {
            throw new Error('Network response was not ok')
        }
    }, [lat, lon])

    React.useEffect(() => {
        if (lat && lon) getWeather()

        switch (dayPeriod) {
            case 'at night':
            case 'in the evening':
                setMessage('Evening')
                break
            case 'in the afternoon':
                setMessage('Afternoon')
                break
            case 'in the morning':
            case 'noon':
                setMessage('Morning')
                break
        }

    }, [setMessage, getWeather, lat, lon])

    const variants = {
        closed: { opacity: 1, x: 0 },
        open: { opacity: 1, y: -250 },
    }




    return (
        <section className='
        relative
        flex
        h-[90vh]
        w-auto
        flex-col
        max-md:ml-[26px]
        md:mx-16
        xl:mx-[165px]
        '
        >
            <Quotes />
            <section
                id="display_clock"
                data-infos-actived={infosContainer}
                className="absolute bottom-44 z-50 w-full mt-8 sm:bottom-16 md:bottom-[98px] ">
                <motion.section
                    variants={variants}
                    animate={infosContainer ? 'open' : 'closed'}
                    transition={{ ease: 'circOut', duration: 0.5 }}
                >
                    <motion.div
                        className="
                        flex
                        items-center
                        gap-x-2
                        sm:gap-x-4
                      "
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ease: 'easeOut', duration: 0.9 }}
                    >
                        {weather?.condition.icon ? (
                            <Image
                                width={50}
                                height={50}
                                alt="condition-icon"
                                src={`https:${weather.condition.icon}`}
                                className='mt-8'
                            />
                        ) : message === 'Evening' ? (
                            <Moon />
                        ) : (
                            <Sun />
                        )}
                        <h4 className="flex text-[12px] uppercase max-md:tracking-[3.6px] max-mobile:hidden sm:text-base md:text-xl mt-8">
                            {`Good ${message}, it's currently `}
                        </h4>

                        <h4 className="text-[12px] uppercase mobile:hidden">{`Good ${message}`}</h4>
                    </motion.div>
                    <CurrentTime />
                    {weather && (
                        <CurrentWeather
                            condition={weather.condition.text}
                            celsius={weather.temp_c}
                            fahrenheit={weather.temp_f}
                            
                        />
                    )}
                    <Location/>
                </motion.section>
            </section>
        </section>
    )
}

export default DisplayTime