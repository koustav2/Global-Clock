'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import daytime from 'public/desktop/bg-image-daytime.jpg';
import nightTime from 'public/desktop/bg-image-nighttime.jpg';
import { useGlobalContext } from '@/context/Context';


type Props = {}

function Background({}: Props) {
    const [backgroundURL, setBackgroundURL] = useState<string>()
    const { message } = useGlobalContext()

    useEffect(() => {
        switch (message) {
          case 'Morning':
          case 'Afternoon':
            setBackgroundURL('daytime')
            break
          case 'Evening':
            setBackgroundURL('nighttime')
            break
        }
      }, [message])

    return (
        <Image
          width={1440}
          height={800}
          alt="background-image"
          src={backgroundURL === 'nighttime' ? nightTime : daytime}
          className="absolute z-30 h-full w-full object-cover"
          priority={true}
          placeholder="blur"
        />
      )
}

export default Background