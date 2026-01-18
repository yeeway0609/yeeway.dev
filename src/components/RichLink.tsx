import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

type RichLinkProps = {
  children: React.ReactNode
  href: string
  imgSrc: string
}

export function RichLink({ children, href, imgSrc }: RichLinkProps) {
  return (
    <HoverCard openDelay={300} closeDelay={300}>
      <HoverCardTrigger asChild>
        <a className="link" href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </HoverCardTrigger>

      <HoverCardContent className="overflow-hidden p-0" sideOffset={4}>
        <img className="pointer-events-none aspect-video object-cover" src={imgSrc} width={320} height={180} alt="" />
      </HoverCardContent>
    </HoverCard>
  )
}
