// TODO: 圖片燈箱，點擊後可以放大

import clsx from 'clsx'

type ImageContainer = {
  children: React.ReactNode
  className?: string
}

export function ImageContainer({ children, className }: ImageContainer) {
  return (
    <span className={clsx('relative block', className)}>
      <span className="bg-muted absolute -z-10 size-full animate-pulse" />
      {children}
    </span>
  )
}
