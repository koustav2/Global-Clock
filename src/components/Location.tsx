'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useGlobalContext } from '@/context/Context'
import useLocation from '../hooks/useLoaction';
import Button from './Button'

const Location = () => {
  const { infosContainer, setInfosContainer } = useGlobalContext()
  const { lat, lon } = useLocation()

  const { data } = useQuery({
    queryKey: ['location', lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  return (
    <motion.div
      className="
        flex
        w-full
        justify-between
        max-md:flex-col
        max-md:gap-y-16
        md:items-center
      "
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: 'circOut', duration: 0.5 }}
    >
      <h3
        className="
            text-[15px]
            uppercase
            max-md:tracking-[3.6px]
            max-sm:mt-4
            sm:text-lg
            md:text-2xl
        "
      >
        {`in ${data?.city}, ${data?.countryCode}`}
      </h3>

      <Button onClick={() => setInfosContainer(!infosContainer)} />
    </motion.div>
  )
}

export default Location