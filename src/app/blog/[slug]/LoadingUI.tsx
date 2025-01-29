'use client'
import { useEffect } from 'react'
import { cardio } from 'ldrs'

// Library bug: https://github.com/GriffinJohnston/ldrs/issues/32
/* eslint-disable @typescript-eslint/no-namespace */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'l-cardio': {
        size?: string | number
        color?: string | number
        speed?: string | number
        stroke?: string | number
      }
    }
  }
}

export default function LoadingUI() {
  useEffect(() => {
    cardio.register()
  }, [])
  // TOFIX: ReferenceError: HTMLElement is not defined
  return <l-cardio size="60" stroke="5" speed="2" color="currentColor" />
}
