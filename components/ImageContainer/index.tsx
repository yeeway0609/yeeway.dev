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
