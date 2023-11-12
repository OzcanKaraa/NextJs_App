"use client"
import Image from 'next/image'
import "./globals.css"
import TrendContent from '@/components/TrendContent'

export default function Home() {
  return (
    <main>
      <TrendContent type='movie' />
    </main>
  )
}
