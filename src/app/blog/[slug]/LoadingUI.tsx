'use client'
import { useEffect } from 'react'
import { cardio } from 'ldrs'

export default function LoadingUI() {
  useEffect(() => {
    cardio.register()
  }, [])
  return <l-cardio size="60" stroke="5" speed="2" color="currentColor"></l-cardio>
}
