import { Metadata } from 'next'
import Image from 'next/image'
import { SpotifyPlayer } from '@/components/SpotifyPlayer'
import { cn } from '@/lib/utils'
import { ImgSlider } from './ImgSlider'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Me',
}

const images = [
  'https://i.scdn.co/image/ab6761610000e5ebe12972169702affd7a4c48ec',
  'https://i.scdn.co/image/ab6761610000e5eb2b9446440d296ce32189024e',
  'https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57',
]

interface GridCardProps {
  children: React.ReactNode
  name: string
  className?: string
}

function GridCard({ children, name, className }: GridCardProps) {
  return (
    <div className={cn('bg-card text-card-foreground relative overflow-clip rounded-2xl border shadow-md', className)} style={{ gridArea: name }}>
      {children}
    </div>
  )
}

// TODO: 所有 grid 會一個一個蹦出來

export default function Page() {
  return (
    <main className="layout-container pt-12 pb-20">
      {/* <h1 className="page-title">About Me</h1> */}
      {/* <p className="page-sub-title">My thoughts on coding, study notes, lifestyle, and other cool stuff.</p> */}
      <div className={`${styles.bentoGrid} mx-auto mb-6 grid h-[600px] grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-6`}>
        <GridCard name="photo">
          <Image className="size-full object-cover" src="/assets/about-me.png" width={1200} height={500} alt="About me" />
        </GridCard>
        <GridCard name="map">
          <h3>my location</h3>
        </GridCard>
        <GridCard name="mbti" className="flex items-center justify-center">
          <h3 className="text-4xl font-bold tracking-widest">ESFJ</h3>
        </GridCard>
        <GridCard name="kpop">
          <ImgSlider className="absolute top-0 left-0 size-full opacity-50" images={images} />
          <div className="relative">
            <h3 className="text-lg font-semibold">🇰🇷 Kpop Favorites</h3>
            <ul className="list-disc pl-4">
              <li>Mamamoo</li>
              <li>NMIXX</li>
            </ul>
          </div>
        </GridCard>
        <GridCard name="jpop">
          <div className="relative">
            <h3 className="text-lg font-semibold">🇰🇷 Jpop Favorites</h3>
            <ul className="list-disc pl-4">
              <li>Ado</li>
              <li>YOASOBI</li>
              <li>tuki.</li>
            </ul>
          </div>
        </GridCard>
        <GridCard name="anime">
          <div className="relative">
            <h3 className="text-lg font-semibold">🇰🇷 Anime Favorites</h3>
            <ul className="list-disc pl-4">
              <li>進擊的巨人</li>
              <li>鋼之鍊金術師</li>
              <li>路人超能 100</li>
            </ul>
          </div>
        </GridCard>
        <GridCard name="front-end">
          <h3>Front-end Engineer</h3>
          <h3>React</h3>
          <h3>Next.js</h3>
        </GridCard>
        <GridCard name="spotify">
          <h3>spotify recent play</h3>
        </GridCard>
        <GridCard name="e">
          <h3>e</h3>
        </GridCard>
        <GridCard name="f">
          <h3>f</h3>
        </GridCard>
        <GridCard name="d">
          <h3>d</h3>
        </GridCard>
      </div>

      <h2>工作經歷</h2>
      <ul className="list-disc pl-4">
        <li></li>
      </ul>

      {/* <section className="sm:w-[500px]">
        <h1 className="name-gradient text-5xl font-black tracking-wider">Yiwei Su</h1>
        <p className="my-2">
          我是蘇奕幃，也可以叫我 Alex 或 yeeway。來自台灣的高雄市，興趣是 ACG、K-pop 與閱讀。 目前深耕於網頁前端技術與 UI
          設計研究，空餘時間也喜歡逛逛展覽或參與社群小聚與研討會。
          <br />
          <br />
          我的個性樂於分享，未來想成為稍微有影響力的人，並且幫助他人解決大大小小的煩惱。 期許自己成為文化內涵與理論技術兼容並蓄的人類。
        </p>
        <SectionTitle>🖥️ Tech stack</SectionTitle>
        <ul className="list-disc pl-4">
          <li>JavaScript, TypeScript</li>
          <li>React, Next.js</li>
          <li>Figma</li>
        </ul>
        <SectionTitle>🎫 社群參與</SectionTitle>
        <ul className="list-disc pl-4">
          <li>GDSC NCKU 2nd Lead</li>
          <li>MOPCON 志工</li>
          <li>COSCUP 志工</li>
          <li>SITCON</li>
        </ul>
        <SectionTitle>🎵 喜愛的音樂</SectionTitle>
        <ul className="list-disc pl-4">
          <li>Kpop: Mamamoo, LE SSERAFIM, STAYC, XG, TWICE</li>
          <li>Jpop: Yurri, milet, Aimer, Ado, Vaundy</li>
        </ul>
        <SectionTitle>🔥 喜愛的動漫</SectionTitle>
        <ol className="list-decimal pl-4">
          <li>進擊的巨人</li>
          <li>鋼之鍊金術師</li>
          <li>路人超能100</li>
        </ol>
        <div className="mt-auto hidden sm:block">
          <SectionTitle>😍 最近推的歌</SectionTitle>
          <SpotifyPlayer />
        </div>
      </section> */}
    </main>
  )
}
