'use client'

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { NoSsr } from '@mui/material'
import { useGlobalContext } from '../context/Context';
import { useWeatherQuery } from '@/hooks/weatherHooks';
import { ClockLoader } from 'react-spinners';

const Infos = () => {
  const { infosContainer, message } = useGlobalContext()
  const [timezoneArea, setTimezoneArea] = useState<string>()
  const { data: weather, isLoading, isError, error } = useWeatherQuery();






  useEffect(() => {
    setTimezoneArea(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [timezoneArea])

  const now = new Date()
  const currentDate = new Date().getTime()

  // Day of the year
  const start = Number(new Date(now.getFullYear(), 0, 0))
  const diff = Math.floor(currentDate - start)
  const oneDay = 1000 * 60 * 60 * 24
  const DayOfTheYear = Math.floor(diff / oneDay)

  // Day of the week
  const startDate = Number(new Date(now.getFullYear(), 0, 1))
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))
  const weekNumber = Math.ceil(days / 7)

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '100%' },
  }

  return (
    <NoSsr>
      <motion.section
        data-dayperiod={message}
        id={message === 'Evening' ? 'evening' : 'day'}
        className="
        absolute
        bottom-0
        z-50
        h-[300px]
        w-full
        data-[dayPeriod='Afternoon']:text-darker-gunpowder-gray
        data-[dayPeriod='Evening']:text-white
        data-[dayPeriod='Morning']:text-darker-gunpowder-gray
        sm:h-[330px]
        md:h-[340px]
      "
        variants={variants}
        initial={{ opacity: 0 }}
        animate={infosContainer ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        <div
          className="
          mx-2
          flex
          w-auto
          justify-between
          max-lg:gap-x-6
          max-sm:my-12
          max-sm:flex-col 
          mobile:mx-[26px]
          sm:ml-16
          max-md:sm:my-[120px]
          md:my-[74px]
          md:w-fit
          lg:ml-[400px]
          lg:w-[844px]
        "
        >
          <section className="flex flex-col gap-4 sm:gap-[42px]">
            <div className="max-sm:flex max-sm:justify-between">
              <span
                className="
                text-[13px]
                uppercase
                leading-[28px]
                tracking-[2.6px]
                lg:text-[15px]
                lg:tracking-[3px]
              "
              >
                current timezone
              </span>
              <h2 className="text-[16px] font-bold mobile:text-[20px] sm:text-[20px] lg:text-3xl">
                {timezoneArea}
              </h2>
            </div>

            <div className="max-sm:flex max-sm:justify-between">
              <span className=" text-[13px] uppercase leading-[28px] tracking-[2.6px] lg:text-[15px] lg:tracking-[3px]">
                day of the year
              </span>
              <h2 className=" text-[16px] font-bold mobile:text-[20px] sm:text-[40px] lg:text-5xl">
                {DayOfTheYear}
              </h2>
            </div>
          </section>

          <hr className="h-[252px] w-[1px] bg-darker-gunpowder-gray opacity-25 max-sm:hidden" />

          <section className="flex flex-col gap-2 max-sm:mt-2 sm:gap-[30px]">
            <div className="max-sm:flex max-sm:justify-between">
              <span className="text-[13px] uppercase leading-[28px] tracking-[2.6px] lg:text-[15px] lg:tracking-[3px]">
                day of the week
              </span>
              <h2 className="text-[16px] font-bold mobile:text-[20px] sm:text-[40px] lg:text-5xl">
                {new Date().getDay()}
              </h2>
            </div>

            <div className="max-sm:flex max-sm:justify-between">
              <span className=" text-[13px] uppercase leading-[28px] tracking-[2.6px] lg:text-[15px] lg:tracking-[3px]">
                week number
              </span>
              <h2 className="text-[16px] font-bold mobile:text-[20px] sm:text-[40px] lg:text-5xl">
                {weekNumber}
              </h2>
            </div>
          </section>
          <hr className="h-[252px] w-[1px] bg-darker-gunpowder-gray opacity-25 max-sm:hidden" />

          {
            isLoading ?
              <ClockLoader
                size={60}
                color="#ada8a8"
                className=" z-50"
                speedMultiplier={1}
              /> :
              isError ? <p>{error?.message}</p> :
                (
                  <section className="flex flex-col gap-2 max-sm:mt-2 sm:gap-[30px]">
                    <div className="max-sm:flex max-sm:justify-between">
                      <span className="text-[13px] uppercase leading-[28px] tracking-[2.6px] lg:text-[15px] lg:tracking-[3px]">
                        Wind Speed
                      </span>
                      <h2 className="text-[16px] font-bold mobile:text-[20px] sm:text-[40px] lg:text-5xl">
                        {weather.wind_kph} <span className='text-sm'>kph</span>
                      </h2>
                    </div>

                    <div className="max-sm:flex max-sm:justify-between">
                      <span className=" text-[13px] uppercase leading-[28px] tracking-[2.6px] lg:text-[15px] lg:tracking-[3px]">
                        Humadity
                      </span>
                      <h2 className="text-[16px] font-bold mobile:text-[20px] sm:text-[40px] lg:text-5xl">
                        {weather.humidity}%
                      </h2>
                    </div>
                  </section>
                )
          }
        </div>
      </motion.section>
    </NoSsr>
  )
}

export default Infos