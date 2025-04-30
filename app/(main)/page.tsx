import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ImageCarousel } from '@/components/ImageCarousel'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Profile } from '@/lib/constants'
import { CarouselImage } from '@/lib/types'
import { CoolAvatar } from './CoolAvatar'
import { SplitTitle } from './SplitTitle'

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

const images: CarouselImage[] = [
  {
    url: '/assets/homepage-photos/1.jpeg',
    height: 250,
  },
  {
    url: '/assets/homepage-photos/2.jpeg',
    title: '東京 - 淺草寺',
    width: 300,
  },
  {
    url: '/assets/homepage-photos/3.jpeg',
  },
  {
    url: '/assets/homepage-photos/5.jpeg',
    title: '東京 - 秋葉原',
    width: 300,
    height: 250,
  },
  {
    url: '/assets/homepage-photos/4.jpeg',
    title: '雄中大黑',
    width: 250,
  },
  {
    url: '/assets/homepage-photos/6.jpeg',
    title: 'Moon Byul 演唱會！',
    height: 250,
  },
  {
    url: '/assets/homepage-photos/7.jpeg',
    title: '東京 - 大井賽馬場',
    width: 250,
  },
  {
    url: '/assets/homepage-photos/8.jpeg',
  },
]

export default function Page() {
  return (
    <main className="flex w-full flex-col items-center pt-16">
      <CoolAvatar />

      <SplitTitle className="mt-5" />

      <section className="animate-fade-in w-full opacity-0 delay-[1.5s]">
        <p className="mt-4 text-center text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          目前是位前端工程師，也可叫我 Alex 或 yeeway
          <br />
          時不時會數位 FOMO，但我努力跟上時代與台北的步調
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

        <div className="my-8 flex justify-center space-x-5">
          <Button asChild>
            <Link href="/blog">Read my articles</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">More about me</Link>
          </Button>
        </div>

        <h2 className="mt-16 mb-2 flex items-center justify-center space-x-2 text-xl font-bold">
          <Icon icon="ri:sparkling-2-fill" className="size-6 text-[#D8A71B]" />
          <span>生活碎片</span>
          <Icon icon="ri:sparkling-2-fill" className="size-6 text-[#D8A71B]" />
        </h2>
        <ImageCarousel images={images} />
      </section>
    </main>
  )
}
