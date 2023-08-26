'use client'
import Image from 'next/image'
import { ProvidesTheQueryClient } from '../../queryClient'
import Background from '@/components/Background'
import DisplayTime from '@/components/DisplayTime'
import Infos from '@/components/Infos'


export default function Home() {








  return (
    <ProvidesTheQueryClient>
      <main className="text-white">
        <div className="absolute z-40 h-full w-full bg-black opacity-40" />
        <Background />
        <DisplayTime/>  
        <Infos/>
      </main>
    </ProvidesTheQueryClient>
  )
}

