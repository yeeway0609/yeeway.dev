import { Metadata } from 'next'
import { MyAvatar } from '@/components/MyAvatar'
import { SpotifyPlayer } from '@/components/SpotifyPlayer'

export const metadata: Metadata = {
  title: 'About Me',
}

export default function Page() {
  return (
    <main className="layout-container mt-8 mb-20 flex flex-col items-start justify-between sm:flex-row-reverse">
      <MyAvatar />
      <section className="sm:w-[500px]">
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
      </section>
    </main>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-primary mt-4 mb-2 text-2xl font-bold sm:my-4">{children}</h2>
}
