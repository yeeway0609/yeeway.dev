import { Icon } from '@iconify/react'
import CoolAvatar from '@/components/home/CoolAvatar'
import SplitTitle from '@/components/home/SplitTitle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Profile } from '@/lib/constants'

const profileLinks = [
  {
    name: 'Mail',
    href: `mailto:${Profile.EMAIL}`,
    icon: <Icon icon="tabler:mail" className="size-7 sm:size-8" />,
  },
  {
    name: 'LinkedIn',
    href: Profile.LINKEDIN,
    icon: <Icon icon="tabler:brand-linkedin" className="size-7 sm:size-8" />,
  },
  {
    name: 'GitHub',
    href: Profile.GITHUB,
    icon: <Icon icon="tabler:brand-github" className="size-7 sm:size-8" />,
  },
  {
    name: 'Instagram',
    href: Profile.INSTAGRAM,
    icon: <Icon icon="tabler:brand-instagram" className="size-7 sm:size-8" />,
  },
  {
    name: 'Spotify',
    href: Profile.SPOTIFY,
    icon: <Icon icon="tabler:brand-spotify" className="size-7 sm:size-8" />,
  },
]

export default function Page() {
  return (
    <main className="flex flex-col items-center pt-10 md:pt-16">
      <CoolAvatar />

      <SplitTitle className="mt-5" />

      <section className="animate-fade-in opacity-0">
        <p className="mt-4 text-center text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          目前是位前端工程師，也可叫我 Alex 或 yeeway
          <br />
          時不時會數位 FOMO，但我會努力跟上時代與台北人的腳步
        </p>

        <div className="mt-4 flex items-center justify-center space-x-4">
          {profileLinks.map((link) => (
            <TooltipProvider key={link.name}>
              <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                  <a className="text-zinc-600 transition-colors dark:text-zinc-400 dark:hover:text-zinc-200" href={link.href}>
                    {link.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-card text-card-foreground">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </section>
    </main>
  )
}
