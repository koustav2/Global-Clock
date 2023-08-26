'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ClockLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';

const CurrentTime = () => {
  const [time, setTime] = useState<string>()
  const [timezone, setTimezone] = useState<string>()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().getHours() +
        ':' +
        (new Date().getMinutes() < 10 ? '0' : '') +
        new Date().getMinutes(),
      )

      setTimezone(
        new Date()
          .toLocaleDateString('en-US', {
            day: 'numeric',
            timeZoneName: 'short',
          })
          .slice(4),
      )

      return () => {
        clearInterval(timer)
      }
    }, 1000)
  }, [])

  if (!time && !timezone)
    return (
      <ClockLoader
        size={60}
        color="#ada8a8"
        className=" z-50"
        speedMultiplier={1}
      />
    )
  else
    return (
      <motion.div
        className="max-sm:mt-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: 'circOut', duration: 0.5 }}
      >
        <h1
          className="
            text-6xl
            font-bold
            max-md:leading-none
            max-md:tracking-[-4.38px]
            mobile:text-[95px]
            sm:text-[175px]
            md:text-10xl
          "
        >
          {time}
          <span
            className="
            ml-3
            text-[18px]
            font-light
            tracking-tighter
            sm:text-[20px]
            md:text-[32px]
            xl:text-[40px]
          "
          >
            {timezone}
          </span>
        </h1>
        {/* <Button/> */}
      </motion.div>
    )
}


// export function Button() {
//   const queryClient = useQueryClient(); // Use useQueryClient to get the query client instance

//   const handleUpdateWeather = async () => {
//     try {
//       const newWeatherData = await getWeather({ lat: 123, lon: 456 }); // Example lat and lon
//       setWeatherData(queryClient, 123, 456, newWeatherData); // Update data in cache
//     } catch (error) {
//       console.error('Error updating weather:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Component content */}
//       <button onClick={handleUpdateWeather}>Update Weather</button>
//     </div>
//   );
// }

export default CurrentTime

