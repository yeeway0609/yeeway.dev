import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ImageCarousel } from '@/components/ImageCarousel'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Profile } from '@/lib/constants'
import { CarouselImage } from '@/lib/types'
import { CoolAvatar } from './CoolAvatar'
import { HomePageTitle } from './HomePageTitle'

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
    icon: <Icon icon="tabler:brand-instagram" className="size-7.5 sm:size-8.5" />,
  },
  {
    name: 'Spotify',
    href: Profile.SPOTIFY,
    icon: <Icon icon="tabler:brand-spotify" className="size-7 sm:size-8" />,
  },
  {
    name: 'Folo',
    href: Profile.FOLO,
    icon: (
      <svg className="size-5.5 sm:size-6.5" viewBox="0 0 145 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_54_296" maskUnits="userSpaceOnUse" x="0" y="0" width="145" height="145">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M144.491 45.4541C144.491 43.75 144.492 42.0456 144.481 40.3413C144.473 38.9056 144.456 37.4702 144.417 36.0352C144.333 32.9075 144.148 29.753 143.592 26.6601C143.028 23.5227 142.107 20.6027 140.655 17.752C139.228 14.9501 137.364 12.3862 135.139 10.1633C132.915 7.94053 130.351 6.07747 127.548 4.65117C124.694 3.19908 121.771 2.27818 118.63 1.71424C115.537 1.15884 112.381 0.974699 109.254 0.890204C107.818 0.851354 106.382 0.834978 104.945 0.826093C103.24 0.81564 101.535 0.816511 99.8296 0.816511L80.0305 0.745605H65.2222L45.7734 0.816511C44.0649 0.816511 42.3564 0.81564 40.6479 0.826093C39.2085 0.834978 37.7698 0.851354 36.331 0.890204C33.196 0.974699 30.0335 1.15902 26.933 1.71511C23.7879 2.27887 20.8604 3.19943 18.0029 4.65047C15.194 6.07694 12.6239 7.94018 10.3953 10.1633C8.1671 12.386 6.29934 14.9494 4.86956 17.7508C3.41382 20.6028 2.49083 23.5246 1.92533 26.6638C1.36854 29.7554 1.18405 32.9089 1.09921 36.0352C1.06053 37.4704 1.04381 38.9057 1.03509 40.3413C1.02464 42.0458 0.937012 44.163 0.937012 45.8674L0.937534 65.0468L0.937012 80.0136L1.02551 99.6005C1.02551 101.307 1.02482 103.014 1.03509 104.72C1.04381 106.158 1.06053 107.595 1.09938 109.032C1.18405 112.164 1.36889 115.323 1.9262 118.42C2.49153 121.562 3.41434 124.486 4.86886 127.34C6.29882 130.146 8.16692 132.713 10.3953 134.939C12.6237 137.165 15.1932 139.031 18.0015 140.459C20.8607 141.913 23.7896 142.835 26.9366 143.4C30.0357 143.956 33.1972 144.141 36.331 144.225C37.7698 144.264 39.2087 144.281 40.648 144.289C42.3566 144.3 44.0649 144.299 45.7734 144.299L65.398 144.3H80.243L99.8296 144.299C101.535 144.299 103.24 144.3 104.945 144.289C106.382 144.281 107.818 144.264 109.254 144.225C112.383 144.141 115.539 143.956 118.634 143.399C121.773 142.835 124.694 141.913 127.547 140.46C130.35 139.031 132.915 137.166 135.139 134.939C137.363 132.714 139.227 130.147 140.654 127.341C142.107 124.486 143.028 121.56 143.593 118.416C144.148 115.321 144.333 112.163 144.417 109.032C144.456 107.595 144.473 106.158 144.481 104.72C144.492 103.014 144.491 101.307 144.491 99.6005C144.491 99.6005 144.49 80.3594 144.49 80.0136V65.0311C144.49 64.7757 144.491 45.4541 144.491 45.4541Z"
            fill="white"
          ></path>
          <path
            d="M103.609 36.6948H53.5823C47.5327 36.6948 42.6284 41.5946 42.6284 47.6388C42.6284 53.683 47.5327 58.5828 53.5823 58.5828H103.609C109.659 58.5828 114.563 53.683 114.563 47.6388C114.563 41.5946 109.659 36.6948 103.609 36.6948Z"
            fill="black"
          ></path>
          <path
            d="M76.9348 65.1489H43.5916C37.5419 65.1489 32.6377 70.0487 32.6377 76.0929C32.6377 82.1371 37.5419 87.0369 43.5916 87.0369H76.9348C82.9845 87.0369 87.8888 82.1371 87.8888 76.0929C87.8888 70.0487 82.9845 65.1489 76.9348 65.1489Z"
            fill="black"
          ></path>
          <path
            d="M80.1608 104.571C80.1608 98.5272 75.2565 93.6274 69.2068 93.6274C63.1572 93.6274 58.2529 98.5272 58.2529 104.571C58.2529 110.616 63.1572 115.515 69.2068 115.515C75.2565 115.515 80.1608 110.616 80.1608 104.571Z"
            fill="black"
          ></path>
        </mask>
        <g mask="url(#mask0_54_296)">
          <rect x="0.414551" y="-6.74585" width="149.477" height="158.537" fill="currentColor"></rect>
        </g>
      </svg>
    ),
  },
  {
    name: 'RSS',
    href: '/feed.xml',
    icon: <Icon icon="mingcute:rss-line" className="size-7 sm:size-8" />,
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
    <main className="mb-20 flex w-full flex-col items-center pt-16">
      <CoolAvatar />

      <HomePageTitle className="mt-5" />

      <section className="animate-fade-in w-full opacity-0 delay-[1.5s]">
        <p className="mt-4 text-center text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          目前是位前端工程師，也可叫我 Alex 或 yeeway
          <br />
          時不時會數位 FOMO，但我努力跟上時代與台北的步調
        </p>

        <div className="mt-4 flex items-center justify-center space-x-4 lg:mt-7">
          {profileLinks.map((link) => (
            <TooltipProvider key={link.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    className="text-zinc-600 transition-colors hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-200"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

        <div className="my-6 flex justify-center space-x-5">
          <Button asChild>
            <Link href="/blog">閱讀文章</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">關於我</Link>
          </Button>
        </div>

        <h2 className="mt-16 mb-2 flex items-center justify-center space-x-2 text-2xl font-bold">
          <Icon icon="ri:sparkling-2-fill" className="size-6 text-[#D8A71B]" />
          <span>生活碎片</span>
          <Icon icon="ri:sparkling-2-fill" className="size-6 text-[#D8A71B]" />
        </h2>
        <ImageCarousel images={images} />
      </section>
    </main>
  )
}
