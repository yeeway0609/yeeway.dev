import Image from "next/image";
import MyAvatar from "@/components/MyAvatar";

function SectionTitle({ children } : { children: string }) {
  return <h2 className="mb-2 mt-4 text-2xl font-bold text-primary sm:my-4">{children}</h2>;
}

export default function AboutPage() {
  return (
    <div className="my-8 flex flex-col items-start justify-evenly sm:flex-row-reverse">
      <MyAvatar />
      <section className="sm:w-[500px]">
        <h1 className="name-gradient text-5xl font-black tracking-wider">Alex Su</h1>
        <p className="my-2">
          我是蘇奕幃，也可以叫我 Alex 或 yeeway。來自台灣的高雄市，現在的 MBTI 是 ESFJ。興趣是聽音樂、看動漫與打電動。
          目前主要學習網頁前端技術與 UI/UX 設計，並且喜歡參與各種社群小聚與研討會。
          <br /><br />
          我的個性樂於分享，未來想成為有影響力的軟體工程師，並且幫助更多人解決大大小小的煩惱。
          期許自己成為文化內涵與理論技術兼容並蓄的人。
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
          <li>台灣樂團: 美秀集團, 冰球樂團, 好樂團, 血肉果汁機</li>
        </ul>
        <SectionTitle>🔥 喜愛的動漫</SectionTitle>
        <ol className="list-decimal pl-4">
          <li>進擊的巨人</li>
          <li>鋼之鍊金術師</li>
          <li>路人超能100</li>
        </ol>
      </section>
    </div>
  );
}